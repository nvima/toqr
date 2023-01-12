<template>
    <div @click="checked = !checked" class="flex items-center relative w-max cursor-pointer select-none group ">
        <div type="checkbox" :class="checked ? 'bg-gray-400' : 'bg-slate-500'"
            class="cursor-pointer sm:w-12 w-10 sm:h-7 h-5 border border-gray-700"></div>
        <span v-if="checked"
            class="absolute font-medium sm:text-xs text-[0.55rem] uppercase sm:right-[1.30rem] right-[1.15rem] text-white">WEB</span>
        <span v-else
            class="absolute font-medium sm:text-xs uppercase text-[0.55rem] right-[0.33rem] text-white">CLI</span>
        <span :class="checked ? 'sm:translate-x-7 translate-x-6 ' : ''"
            class="sm:w-5 w-4 sm:h-7 h-5 sm:right-7 right-6 absolute transform transition-transform bg-gray-200 border border-gray-700" />
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const checked = ref(false);
defineExpose({
    checked
})
</script>
