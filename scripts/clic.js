/**
 * Une classe avec plusieurs fonctionnalité qui 'encadre' une division.
 */
class FractionNumber {
    constructor(a, b) {
        this.a = a
        this.b = b
        this.displayA = Math.abs(a)
        this.displayB = Math.abs(b)
        this.value = b === 0 ? NaN : (a / b)
    }

    literal(absolute = false, brackets = false) {
        let split = this.value.toString().split('.')
        let ret = split.length !== 2 || split[1].length <= 6 ? Math.abs(this.value).toString() : `${this.displayA}/${this.displayB}`
        
        if(brackets) {
            ret = `(${ret})`
        }
        if(this.hasNegativeSign() && !absolute) {
            ret = `-${ret}`
        }
        return ret
    }

    hasNegativeSign() {
        return this.value < 0
    }

    invertSign() {
        return new FractionNumber(-this.a, this.b)
    }

    signedLiteral(brackets = false) {
        let literal = this.literal(true, brackets)
        return this.hasNegativeSign() ? `-${literal}` : `+${literal}`
    }

    static min(a, b) {
        if(a.value > b.value) {
            return b
        }
        return a
    }

    static max(a, b) {
        if(a.value < b.value) {
            return b
        }
        return a
    }
}

/**
 * Classe qui représente également une fraction.
 * Celle ci cependant prend en charge le cas où le nominateur notamment est une expression non évaluée ('3 + √32' par exemple).
 * En effet, si, une fois évaluée, cette expression donne un nombre négatif, et que la valeur de la fraction est subséquemment
 * négative, il ne faudrait pas qu'un signe '-' soit ajouté (ce qui est normalement le cas avec FractionNumber).
 */
class ExpressionFractionNumber extends FractionNumber {
    constructor(a, b, displayA, displayB) {
        super(a, b)
        this.displayA = displayA
        this.displayB = displayB
        this.negated = false
    }

    hasNegativeSign() {
        return this.negated
    }

    invertSign() {
        let num = new ExpressionFractionNumber(-this.a, this.b, this.displayA, this.displayB)
        num.negated = !num.negated
        return num
    }
}

/**
 * Représente un nombre complexe en mathématiques: un nombre avec une partie réelle et une partie imaginaire.
 * Soit a et b deux réels; un nombre complexe peut être écrit de la manière suivante: {@code a+bi=z}.
 * Note: tout nombre réel est complexe, la partie imaginaire peut donc être nulle (voir constructeur)
 */
class ComplexNumber {
    constructor(realPart, imaginaryPart = null) {
        this.realPart = realPart
        this.imaginaryPart = imaginaryPart
    }

    literal(brackets = false) {
        if(this.isReal()) {
            return this.realPart.literal()
        }

        let operationSign = this.imaginaryPart.hasNegativeSign() ? '-' : '+'
        let res = `${this.realPart.literal()} ${operationSign} ${this.imaginaryPart.literal(true, true)}i`
        if(brackets) {
            res = `(${res})`
        }
        return res
    }

    isReal() {
        return this.imaginaryPart === null || this.imaginaryPart.value === 0
    }
}

let ouvert = false;

/**
 * Transforme un nombre en String précédé de son signe opérateur.
 * Permet d'éviter les aberrations du style: '7--3' ou '4+-3'
 * @param {number} num le nombre en question.
 * @returns Un String avec le signe opérateur du nombre et la valeur absolue du nombre.
 */
let signed = (num) => num === 0 ? '' : (num < 0 ? '-' : '+') + Math.abs(num);

/**
 * Modifie le contenu d'un élément portant l'id entré sur la page HTML.
 * @param {String} id L'id de l'élément à modifier.
 * @param {String} value Le texte à lui assigner.
 */
let setContent = (id, value) => {
    console.log(id + ': ' + value)
    document.getElementById(id).innerHTML = value
}

/**
 * Méthode appelée quand le boutton 'Calculer' est appuyé
 */
function clic() {
    let style = sessionStorage.getItem("style");

    if(!ouvert) {
        document.getElementById("opened-bloc").innerHTML += "<img src='img/polynomial_img_"+style+".svg' id='image' width='100px' height='100px'>";
        document.getElementById('reponse').toggleAttribute('hidden', false)
        ouvert = true;
    }

    const form = document.getElementById("form");
    let a = form.elements[0].value;
    let b = form.elements[1].value;
    let c = form.elements[2].value;
    console.log(`${a} ; ${b} ; ${c}`);

    let delta = b**2 - 4*a*c;
    // utilisation de FractionNumber: voir la classe plus haut, préserve les nombres à décimales trop longues en fraction
    let alpha = new FractionNumber(-b, 2*a);
    let beta = new FractionNumber(-delta, 4*a);
    let [xa, xb] = complexRoots(delta, a, b)

    // on envoie au fichier 'courbe.js' les informations
    localStorage.setItem("a", a);
    localStorage.setItem("b", b);
    localStorage.setItem("c", c);   
    localStorage.setItem("alpha", alpha.value);
    localStorage.setItem("beta", beta.value);
    courbe() // méthode de courbe.js
    
    let sB = signed(b)
    let sC = signed(c)
    // si la racine n'est pas réelle, on met le nombre complexe entre parenthèses et précédé d'un signe '-': pour la forme factorisée
    let sXa = xa.isReal() ? xa.realPart.invertSign().signedLiteral() : `-${xa.literal(true)}`
    let sXb = xb.isReal() ? xb.realPart.invertSign().signedLiteral() : `-${xb.literal(true)}`

    setContent('polynomial_field', `${a}x²${sB}x${sC}`)
    setContent('canonical_field', `${a}(x${alpha.invertSign().signedLiteral()})²${beta.signedLiteral()}`)
    setContent('factorized_field', `${a}(x${sXa}) (x${sXb})`)
    setContent('delta_field', delta)
    setContent('root1_field', xa.literal())
    setContent('root2_field', xb.literal())

    setContent('inequation_sign', `f(x) ${a < 0 ? '>' : '<'} 0`)

    let interval = '∅'
    
    // Il n'y a un intervalle valide seulement pour les solutions réelles (pas d'ordre dans les complexes)
    if(xa.isReal() && xb.isReal()) {
        if(xa.realPart.value === xb.realPart.value) {
            interval = `{${xa.realPart.value}}`
        } else {
            let min = FractionNumber.min(xa.realPart, xb.realPart)
            let max = FractionNumber.max(xa.realPart, xb.realPart)
            interval = `]${min.literal()} ; ${max.literal()}[`
        }
    }
    setContent('inequation_solutions', interval)
}

/**
 * Calcule la valeur des racines (valeurs de x pour lesquelles y=0) de la fonction.
 * @param {number} delta La valeur du delta de la fonction.
 * @param {number} a Le 'a' de la fonction.
 * @param {number} b Le 'b' de la fonction.
 * @returns Une paire de deux nombres complexes représentés par {@link ComplexNumber}.
 */
function complexRoots(delta, a, b) {
    if(delta >= 0) {
        return [new ComplexNumber(fraction(-b - Math.sqrt(delta), 2*a, `(${-b}-√${delta})`)), new ComplexNumber(fraction(-b + Math.sqrt(delta), 2*a, `(${-b}+√${delta})`))]
    }

    let realPart = new FractionNumber(-b, 2*a)
    let imaginaryPart = fraction(Math.sqrt(Math.abs(delta)), 2*a, `√${Math.abs(delta)}`)

    return [new ComplexNumber(realPart, imaginaryPart.invertSign()), new ComplexNumber(realPart, imaginaryPart)]
}

/**
 * Détermine le bon type de FractionNumber à retourner.
 * @param {number} a Le dividende.
 * @param {number} b Le diviseur.
 * @param {String} displayA Une valeur d'affichage dans le cas où a a plus de 6 décimales.
 * @param {String} displayB Une valeur d'affichage dans le cas où b a plus de 6 décimales (inutilisé ici).
 * @returns Une nouvelle instance de {@link FractionNumber} si la valeur peut être affichée, sinon une instance de {@link ExpressionFractionNumber}.
 */
function fraction(a, b, displayA = Math.abs(a), displayB = Math.abs(b)) {
    let split = (a / b).toString().split('.')
    return split.length !== 2 || split[1].length <= 6 ? new FractionNumber(a, b) : new ExpressionFractionNumber(a, b, displayA, displayB)
}