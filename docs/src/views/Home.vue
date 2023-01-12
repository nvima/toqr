<template>
    <div class="bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-400">
        <LanguageSwitch />
        <ThemeSwitch />
        <div class="flex justify-center items-center min-h-screen flex-col">
            <div class="my-20">
                <div class="flex mx-auto max-w-fit">
                    <h1 class="text-xl flex-1 sm:text-4xl font-extrabold text-slate-900 tracking-tight
                        dark:text-slate-200 text-right whitespace-nowrap">
                        {{ $t('h1') }}
                    </h1>
                    <div class="flex-none sm:mt-2 mt-1 ml-2">
                        <LabeledSwitch ref="versionSwitch" />
                    </div>
                </div>
                <div
                    class="sm:max-w-2xl max-w-[320px] text-center pb-6 pt-1 text-lg text-slate-700 dark:text-slate-400 mx-6">
                    {{ $t('desc') }}
                </div>
                <Urls :data="urls" :cli="versionSwitch.checked" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { ref } from 'vue';
import Urls from '@/components/Urls.vue';
import LabeledSwitch from '@/components/LabeledSwitch.vue'
import LanguageSwitch from '@/components/LanguageSwitch.vue';
import ThemeSwitch from '@/components/ThemeSwitch.vue';
const versionSwitch = ref<{ checked: boolean }>({ checked: false })
const urls = ref([
    { title: "URL", url: "toqr.link/url=", data: "https://example.com", curlEnd: " > qr.png" },
    { title: "Text", url: "toqr.link/text=", data: "Hello World", curlEnd: " > qr.png" },
    { title: "Email", url: "toqr.link/mail=", data: "example@live.com?subject=Hi&body=Whats up", curlEnd: " > qr.png" },
    { title: "Phone", url: "toqr.link/phone=", data: "+49123456789", curlEnd: " > qr.png" },
    { title: "SMS", url: "toqr.link/sms=", data: "+49123456789?body=Whats up", curlEnd: " > qr.png" },
    { title: "Whatsapp Call", url: "toqr.link/whatsapp=", data: "+49123456789", curlEnd: " > qr.png" },
    { title: "Whatsapp SMS", url: "toqr.link/whatsapp=", data: "+49123456789?text=Hello", curlEnd: " > qr.png" },
    { title: "Crypto", url: "toqr.link/", data: "bitcoin=1A1zP1eP5Q?amount=1", curlEnd: " > qr.png" }
])
useHead({
    title: "toqr docs",
    meta: [
        {
            name: 'description',
            content: 'toqr documentation'
        },
        {
            name: 'robots',
            content: 'index'
        },
    ]
})
</script>
