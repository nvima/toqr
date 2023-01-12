<template>
    <div class="absolute top-5 right-5">
        <button class="group m-auto ml-3 sm:ml-6 relative cursor-pointer flex focus:pointer-events-none z-20">
            <SvgDeFlag v-if="i18nLocale.locale.value == 'de'" />
            <SvgDkFlag v-else-if="i18nLocale.locale.value == 'dk'" />
            <SvgEsFlag v-else-if="i18nLocale.locale.value == 'es'" />
            <SvgFrFlag v-else-if="i18nLocale.locale.value == 'fr'" />
            <SvgGbFlag v-else-if="i18nLocale.locale.value == 'en'" />
            <SvgGrFlag v-else-if="i18nLocale.locale.value == 'gr'" />
            <SvgHrFlag v-else-if="i18nLocale.locale.value == 'hr'" />
            <SvgItFlag v-else-if="i18nLocale.locale.value == 'it'" />
            <SvgNlFlag v-else-if="i18nLocale.locale.value == 'nl'" />
            <SvgPlFlag v-else-if="i18nLocale.locale.value == 'pl'" />
            <SvgPtFlag v-else-if="i18nLocale.locale.value == 'pt'" />
            <SvgRoFlag v-else-if="i18nLocale.locale.value == 'ro'" />
            <SvgSeFlag v-else-if="i18nLocale.locale.value == 'se'" />
            <SvgGbFlag v-else />
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5'
                stroke='currentColor'
                class='w-6 h-6 m-auto ml-1 text-gray-800 group-focus-within:rotate-180 dark:text-white'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
            </svg>
            <div class="group-focus-within:block hidden pointer-events-auto dark:bg-inherit">
                <div class='grid grid-cols-2 smobile:gap-4 gap-2 w-max h-max absolute rounded-lg border shadow-lg top-14 right-0 
    p-4 cursor-pointer smobile:text-base text-sm border-slate-400 hover:[&>button>p]:text-slate-800
    dark:border-slate-700 dark:hover:[&>button>p]:text-white'>
                    <button class='flex' v-if="i18nLocale.locale.value != 'de'" @click.stop="switchLang('de')">
                        <SvgDeFlag />
                        <p class='pl-2 my-auto hover:font-semibold before:content-[attr(data-before)] before:block before:font-semibold
    before:h-0 before:overflow-hidden before:invisible' :data-before="$t('german')">
                            {{ $t('german') }}
                        </p>
                    </button>
                    <button class='flex' v-if="i18nLocale.locale.value != 'en'" @click.stop="switchLang('en')">
                        <SvgGbFlag />
                        <p class='pl-2 my-auto hover:font-semibold before:content-[attr(data-before)] before:block before:font-semibold
before:h-0 before:overflow-hidden before:invisible' :data-before="$t('english')">
                            {{ $t('english') }}
                        </p>
                    </button>
                    <button class='flex' v-if="i18nLocale.locale.value != 'es'" @click.stop="switchLang('es')">
                        <SvgEsFlag />
                        <p class='pl-2 my-auto hover:font-semibold before:content-[attr(data-before)] before:block before:font-semibold
before:h-0 before:overflow-hidden before:invisible' :data-before="$t('spanish')">
                            {{ $t('spanish') }}
                        </p>
                    </button>
                    <button class='flex' v-if="i18nLocale.locale.value != 'fr'" @click.stop="switchLang('fr')">
                        <SvgFrFlag />
                        <p class='pl-2 my-auto hover:font-semibold before:content-[attr(data-before)] before:block before:font-semibold
before:h-0 before:overflow-hidden before:invisible' :data-before="$t('french')">
                            {{ $t('french') }}
                        </p>
                    </button>
                    <button class='flex' v-if="i18nLocale.locale.value != 'dk'" @click.stop="switchLang('dk')">
                        <SvgDkFlag />
                        <p class='pl-2 my-auto hover:font-semibold before:content-[attr(data-before)] before:block before:font-semibold
before:h-0 before:overflow-hidden before:invisible' :data-before="$t('danish')">
                            {{ $t('danish') }}
                        </p>
                    </button>
                    <button class='flex' v-if="i18nLocale.locale.value != 'gr'" @click.stop="switchLang('gr')">
                        <SvgGrFlag />
                        <p class='pl-2 my-auto hover:font-semibold before:content-[attr(data-before)] before:block before:font-semibold
before:h-0 before:overflow-hidden before:invisible' :data-before="$t('greek')">
                            {{ $t('greek') }}
                        </p>
                    </button>
                    <button class='flex' v-if="i18nLocale.locale.value != 'hr'" @click.stop="switchLang('hr')">
                        <SvgHrFlag />
                        <p class='pl-2 my-auto hover:font-semibold before:content-[attr(data-before)] before:block before:font-semibold
before:h-0 before:overflow-hidden before:invisible' :data-before="$t('croatian')">
                            {{ $t('croatian') }}
                        </p>
                    </button>
                    <button class='flex' v-if="i18nLocale.locale.value != 'it'" @click.stop="switchLang('it')">
                        <SvgItFlag />
                        <p class='pl-2 my-auto hover:font-semibold before:content-[attr(data-before)] before:block before:font-semibold
before:h-0 before:overflow-hidden before:invisible' :data-before="$t('italian')">
                            {{ $t('italian') }}
                        </p>
                    </button>
                    <button class='flex' v-if="i18nLocale.locale.value != 'nl'" @click.stop="switchLang('nl')">
                        <SvgNlFlag />
                        <p class='pl-2 my-auto hover:font-semibold before:content-[attr(data-before)] before:block before:font-semibold
before:h-0 before:overflow-hidden before:invisible' :data-before="$t('dutch')">
                            {{ $t('dutch') }}
                        </p>
                    </button>
                    <button class='flex' v-if="i18nLocale.locale.value != 'pl'" @click.stop="switchLang('pl')">
                        <SvgPlFlag />
                        <p class='pl-2 my-auto hover:font-semibold before:content-[attr(data-before)] before:block before:font-semibold
before:h-0 before:overflow-hidden before:invisible' :data-before="$t('polish')">
                            {{ $t('polish') }}
                        </p>
                    </button>
                    <button class='flex' v-if="i18nLocale.locale.value != 'pt'" @click.stop="switchLang('pt')">
                        <SvgPtFlag />
                        <p class='pl-2 my-auto hover:font-semibold before:content-[attr(data-before)] before:block before:font-semibold
before:h-0 before:overflow-hidden before:invisible' :data-before="$t('portuguese')">
                            {{ $t('portuguese') }}
                        </p>
                    </button>
                    <button class='flex' v-if="i18nLocale.locale.value != 'ro'" @click.stop="switchLang('ro')">
                        <SvgRoFlag />
                        <p class='pl-2 my-auto hover:font-semibold before:content-[attr(data-before)] before:block before:font-semibold
before:h-0 before:overflow-hidden before:invisible' :data-before="$t('romanian')">
                            {{ $t('romanian') }}
                        </p>
                    </button>
                    <button class='flex' v-if="i18nLocale.locale.value != 'se'" @click.stop="switchLang('se')">
                        <SvgSeFlag />
                        <p class='pl-2 my-auto hover:font-semibold before:content-[attr(data-before)] before:block before:font-semibold
before:h-0 before:overflow-hidden before:invisible' :data-before="$t('swedish')">
                            {{ $t('swedish') }}
                        </p>
                    </button>
                </div>
            </div>
        </button>
    </div>
</template>
<script setup>
import SvgDeFlag from '@/components/svg/flags/SvgDeFlag.vue'
import SvgDkFlag from '@/components/svg/flags/SvgDkFlag.vue'
import SvgEsFlag from '@/components/svg/flags/SvgEsFlag.vue'
import SvgFrFlag from '@/components/svg/flags/SvgFrFlag.vue'
import SvgGbFlag from '@/components/svg/flags/SvgGbFlag.vue'
import SvgGrFlag from '@/components/svg/flags/SvgGrFlag.vue'
import SvgHrFlag from '@/components/svg/flags/SvgHrFlag.vue'
import SvgItFlag from '@/components/svg/flags/SvgItFlag.vue'
import SvgNlFlag from '@/components/svg/flags/SvgNlFlag.vue'
import SvgPlFlag from '@/components/svg/flags/SvgPlFlag.vue'
import SvgPtFlag from '@/components/svg/flags/SvgPtFlag.vue'
import SvgRoFlag from '@/components/svg/flags/SvgRoFlag.vue'
import SvgSeFlag from '@/components/svg/flags/SvgSeFlag.vue'
import { onBeforeMount } from 'vue'
import { useI18n } from "vue-i18n";


const i18nLocale = useI18n();
const locales = ['de', 'dk', 'es', 'fr', 'en', 'gr', 'hr', 'it', 'nl', 'pl', 'pt', 'ro', 'se']

onBeforeMount(() => {
    let lang = ''
    if (typeof URLSearchParams !== 'undefined') {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        lang = urlParams.get('lang')
    }

    const locale = getLocalStorage('lang')
    if (locales.includes(lang)) {
        i18nLocale.locale.value = lang
        saveLocalStorage('lang', lang);
    } else if (locales.includes(locale)) {
        i18nLocale.locale.value = locale
    } else {
        i18nLocale.locale.value = 'en'
    }
    window.history.pushState({}, document.title, window.location.pathname);
})

function getLocalStorage(key) {
    if (typeof (Storage) !== "undefined") {
        return localStorage.getItem(key) || ""
    }
    return ""
}

function switchLang(locale) {
    i18nLocale.locale.value = locale
    saveLocalStorage('lang', locale);
}
function saveLocalStorage(key, value) {
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem(key, value)
    }
}
</script>

