const deepl = require('deepl-node');
const translate = new deepl.Translator(process.env.DEEPL_AUTH)
const fs = require('fs')
const path = require('path');
const util = require('util');
const translationFile = '/src/translations.js'
const { messages } = require(path.join(process.cwd(), translationFile));
console.log("STARTING DEEPL TRANSLATIONS")

async function go() {
    const sleepTimer = 1000
    const originalLang = 'de'
    const translations = [
        { file: 'en.json', lang: 'en', langT: 'en-GB' },
        { file: 'dk.json', lang: 'dk', langT: 'da' },
        { file: 'es.json', lang: 'es', langT: 'es' },
        { file: 'fr.json', lang: 'fr', langT: 'fr' },
        { file: 'gr.json', lang: 'gr', langT: 'el' },
        { file: 'it.json', lang: 'it', langT: 'it' },
        { file: 'nl.json', lang: 'nl', langT: 'nl' },
        { file: 'pl.json', lang: 'pl', langT: 'pl' },
        { file: 'pt.json', lang: 'pt', langT: 'pt-PT' },
        { file: 'ro.json', lang: 'ro', langT: 'ro' },
        { file: 'se.json', lang: 'se', langT: 'sv' },
    ]

    translation_loops: for (const translation of translations) {
        for (const prop in messages[originalLang]) {
            //Check already translated
            if (translation.lang in messages && prop in messages[translation.lang]) {
                console.log(
                    'already translated continue: ' + prop + translation.lang
                )
                continue
            }
            if (messages[translation.lang] == undefined) {
                messages[translation.lang] = {}
            }
            if (translation.lang in messages && messages[translation.lang][prop] == undefined) {
                messages[translation.lang][prop] = {}
            }
            try {
                let txt = messages[originalLang][prop];
                let regex = /\{([^}]+)\}/g;
                let matches = txt.match(regex)
                if (matches) {
                    for (let i = 0; i < txt.match(regex).length; i++) {
                        txt = txt.replace(matches[i], "{xxx" + i + "}")
                    }
                }
                const res = await translate.translateText(txt, originalLang, translation.langT, { tagHandling: 'xml' })

                if (matches) {
                    for (let i = 0; i < txt.match(regex).length; i++) {
                        res.text = res.text.replace("{xxx" + i + "}", matches[i])
                    }
                }
                console.log('translated prop: ' + prop)
                console.log(res.text)
                messages[translation.lang][prop] = res.text
            } catch (err) {
                console.log(messages[originalLang][prop])
                console.log(translation.lang)
                console.log(originalLang)
                console.log('error catch')
                console.log(err)
                //save file

                fs.writeFileSync(process.cwd() + translationFile, 'export const messages = ');
                fs.appendFileSync(process.cwd() + translationFile, util.inspect(messages));
                break translation_loops
            }
            await delay(sleepTimer)
            console.log('...')
        }
        fs.writeFileSync(process.cwd() + translationFile, 'export const messages = ');
        fs.appendFileSync(process.cwd() + translationFile, util.inspect(messages));
    }
    console.log('start unnecessary translations checker')
    await delay(sleepTimer)
    for (const translation of translations) {
        for (const prop in messages[translation.lang]) {
            if (messages[originalLang][prop] == undefined) {
                delete messages[translation.lang][prop]
                console.log(translation.lang.toUpperCase() + ': ' + prop + ' deleted')
            }
        }
    }
    fs.writeFileSync(process.cwd() + translationFile, 'export const messages = ');
    fs.appendFileSync(process.cwd() + translationFile, util.inspect(messages));
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time))
}

go()
