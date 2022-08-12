/* eslint-disable @typescript-eslint/semi */
export function interfaceExportBuilder(text: string, name: string):string {
    let bb = text.match(/export\s+(?!.+export\s).+/g)
    if (bb) {
        let str = bb.map(b => {
            let a = b.match(/export\s+const\s+(.+)/)
            if (a) {
                let key = a[1].split('=', 2).map(a => a.trim())[0]
                let right_p = a[1].indexOf('{')
                let str = a[1].substring(a[1].indexOf('=') + 1, right_p > -1 ? right_p : a[1].length).trim()
                if (str.match(/^\(/)) {
                    str = str.replace(/\=\>$/, '').trim()
                } else if (str.match(/^function(\s|\()+/)) {
                    str = str.replace(/^function.*\(/, '(')
                } else {
                    str = 'any'
                }
                //console.log(`${key}:${str}`)
                return `${key}:${str}`
            } else {
                let a = b.match(/export\s+function\s+(.+)/)
                if (a) {
                    let str = a[1].trim().replace(/{/, '').trim()
                    //console.log(str)
                    return str
                }
            }

        });
        return `
export interface ${name} {
    ${str.join('\n    ')}
}
`
    }
    return ''
}