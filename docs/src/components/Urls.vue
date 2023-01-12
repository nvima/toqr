<template>
    <ul role="list" class="rounded-lg shadow-xl border border-slate-400 dark:border-slate-700 mx-6">
        <li v-for="command, index in props.data" :key="index" class="grid py-4 px-2 grid-cols-12 max-w-2xl
            w-full first:rounded-t-lg last:rounded-b-lg
            even:bg-gray-50 odd:bg-gray-300 dark:even:bg-slate-900 dark:odd:bg-slate-800">
            <div class="col-span-6 sm:col-span-3 text-left font-extrabold">
                {{ command.title }}
            </div>
            <div class="shrink-0 sm:col-span-7 col-span-12 order-3 pt-2 sm:pt-0 sm:order-2 text-right flex">
                <div class="shrink-0">
                    {{ cli ? "curl -L " + command.url : command.url }}
                </div>
                <input type="text" class="h-full w-full bg-inherit 
                hover:border-b p-0 focus:ring-0 border-0 border-b border-transparent 
                dark:text-slate-600 dark:focus:text-slate-400 dark:focus:border-slate-400
                focus:text-slate-700 text-slate-500 focus:border-slate-700
                " v-model="command.data" />
            </div>
            <div :class='cli && "justify-end w-full"' class="sm:col-span-2 col-span-6 sm:order-3 text-right flex gap-x-1 sm:m-auto ml-auto
                [&>div>svg]:cursor-pointer dark:hover:[&>div>svg]:text-slate-600 hover:[&>div>svg]:text-slate-500">
                <div class="whitespace-nowrap sm:block hidden" v-if="cli">
                    {{ command.curlEnd }}
                </div>
                <div :title="$t('copy')">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        @click="copy(command.url, command.data, command.curlEnd)" stroke="currentColor"
                        stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                </div>
                <div :title="$t('open')" v-if="!cli">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        @click="open(command.url, command.data)" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </div>
                <div :title="$t('download')" v-if="!cli">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        @click="download(command.url, command.data)" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                </div>
            </div>
        </li>
    </ul>
</template>
<script setup lang="ts">
interface Data {
    title: string;
    url: string;
    data: string;
    curlEnd: string;
}
interface Props {
    data: Array<Data>;
    cli: boolean;
}
const props = defineProps<Props>();

function copy(url: string, data: string, curlEnd: string) {
    navigator.clipboard.writeText(`${props.cli ? 'curl -L ' : ''}${url}${data}${props.cli ? curlEnd : ''}`);
}
function open(url: string, data: string) {
    window.open(`https://${url}${data}`, '_blank');
}
function download(url: string, data: string) {
    fetch(`https://${url}${data}`)
        .then(resp => resp.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'qrcode.png';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
        })
        .catch((err) => {
            console.log(err);
        });
}
</script>

