<template>
    <div class="absolute top-5 right-28 text-slate-900 dark:text-white cursor-pointer" @click="changeTheme">
        <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
            <path fill-rule="evenodd"
                d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                clip-rule="evenodd" />
        </svg>
    </div>
</template>
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
const isDark = ref(false);
onBeforeMount(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage)
        && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
        isDark.value = true;
    } else {
        document.documentElement.classList.remove('dark')
        isDark.value = false;
    }
})

function changeTheme() {
    //Check if dark class is in the html element and remove it or add it if not
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark')
        localStorage.theme = 'light'
        isDark.value = false;
    } else {
        document.documentElement.classList.add('dark')
        localStorage.theme = 'dark'
        isDark.value = true;
    }
    // Whenever the user explicitly chooses light mode
    // console.log(document.documentElement.classList.contains('dark'))
    // console.log(localStorage.theme)
    // localStorage.theme = 'light'

    // document.documentElement.classList.remove('dark')
    // Whenever the user explicitly chooses dark mode
    // localStorage.theme = 'dark'

    // Whenever the user explicitly chooses to respect the OS preference
}
localStorage.removeItem('theme')
</script>
