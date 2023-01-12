const translate = require('@vitalets/google-translate-api')
const fs = require('fs')
const path = require('path');
const util = require('util');
const translationFile = '/src/translations.js'
const { messages } = require(path.join(process.cwd(), translationFile));

async function go() {
  const sleepTimer = 1000
  const originalLang = 'de'
  const translations = [
    /* { file: 'dk.json', lang: 'da' }, */
    /* { file: 'en.json', lang: 'en' }, */
    /* { file: 'es.json', lang: 'es' }, */
    /* { file: 'fr.json', lang: 'fr' }, */
    /* { file: 'gr.json', lang: 'el' }, */
    { file: 'hr.json', lang: 'hr' },
    /* { file: 'it.json', lang: 'it' }, */
    /* { file: 'nl.json', lang: 'nl' }, */
    /* { file: 'pl.json', lang: 'pl' }, */
    /* { file: 'pt.json', lang: 'pt' }, */
    /* { file: 'ro.json', lang: 'ro' }, */
    /* { file: 'se.json', lang: 'sv' }, */
  ]

  translation_loops: for (const translation of translations) {
    for (const prop in messages[originalLang]) {
      //Check already translated
      if (translation.lang in messages && prop in messages[translation.lang]) {
        console.log(
          'already translated continue: ' + prop + ' ' + translation.lang
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
        const res = await translate(txt, {
          from: originalLang,
          to: translation.lang,
        })
        if (matches) {
          for (let i = 0; i < txt.match(regex).length; i++) {
            res.text = res.text.replace("{xxx" + i + "}", matches[i])
          }
        }
        console.log('translated prop: ' + prop)
        console.log(res.text)
        messages[translation.lang][prop] = res.text
      } catch (err) {
        console.log(messages[translation.lang][prop])
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
