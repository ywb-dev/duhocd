<script setup lang="ts">
definePageMeta({
    layout: 'admin',
    middleware: 'is-logged-in'
});


import Chart from 'primevue/chart';
import { ref, onMounted } from "vue";

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () =>  {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                type: 'bar',
                label: 'Dataset 1',
                backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                data: [50, 25, 12, 48, 90, 76, 42]
            },
            {
                type: 'bar',
                label: 'Dataset 2',
                backgroundColor: documentStyle.getPropertyValue('--green-500'),
                data: [21, 84, 24, 75, 37, 65, 34]
            },
            {
                type: 'bar',
                label: 'Dataset 3',
                backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
                data: [41, 52, 24, 74, 23, 21, 32]
            }
        ]
    };
};
const setChartOptions = () =>  {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            tooltips: {
                mode: 'index',
                intersect: false
            },
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                stacked: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}
</script>

<template>
    <div class="dashboard relative w-full">
        <div class="layout-main">
            <h3 class="m-0">Statistic</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 -ml-4">
                <div class="p-8 m-4 border border-solid border-grey-400 rounded-xl">
                    <div class="flex justify-between w-full mb-4">
                        <div>
                            <span class="text-sm text-[#6b7280] mb-3.5 block">Tài khoản du học</span>
                            <div class="text-lg text-black">154</div>
                        </div>
                        <div class="icon w-10 h-10 bg-[#c3edf5] rounded-md flex items-center justify-center">
                            <i class="pi pi-inbox text-cyan-500 text-xl"></i>
                        </div>
                    </div>
                    <div>
                        <span class="text-medium text-green-500">24</span>
                        <span class="text-sm text-[#6b7280]"> người đăng ký mới</span>
                    </div>
                </div>
                <div class="p-8 m-4 border border-solid border-grey-400 rounded-xl">
                    <div class="flex justify-between w-full mb-4">
                        <div>
                            <span class="text-sm text-[#6b7280] mb-3.5 block">Đăng ký tư vấn</span>
                            <div class="text-lg text-black">140</div>
                        </div>
                        <div class="icon w-10 h-10 bg-[#c3edf5] rounded-md flex items-center justify-center">
                            <i class="pi pi-comment text-purple-500 text-xl"></i>
                        </div>
                    </div>
                    <div>
                        <span class="text-medium text-green-500">24</span>
                        <span class="text-sm text-[#6b7280]"> Du học sinh đã đăng ký</span>
                    </div>
                </div>
                <div class="p-8 m-4 border border-solid border-grey-400 rounded-xl">
                    <div class="flex justify-between w-full mb-4">
                        <div>
                            <span class="text-sm text-[#6b7280] mb-3.5 block">Đăng ký tư vấn</span>
                            <div class="text-lg text-black">154</div>
                        </div>
                        <div class="icon w-10 h-10 bg-[#c3edf5] rounded-md flex items-center justify-center">
                            <i class="pi pi-comment text-purple-500 text-xl"></i>
                        </div>
                    </div>
                    <div>
                        <span class="text-medium text-green-500">24</span>
                        <span class="text-sm text-[#6b7280]"> Du học sinh đã đăng ký</span>
                    </div>
                </div>
                <div class="p-8 m-4 border border-solid border-grey-400 rounded-xl">
                    <div class="flex justify-between w-full mb-4">
                        <div>
                            <span class="text-sm text-[#6b7280] mb-3.5 block">Đăng ký tư vấn</span>
                            <div class="text-lg text-black">154</div>
                        </div>
                        <div class="icon w-10 h-10 bg-[#c3edf5] rounded-md flex items-center justify-center">
                            <i class="pi pi-comment text-purple-500 text-xl"></i>
                        </div>
                    </div>
                    <div>
                        <span class="text-medium text-green-500">24</span>
                        <span class="text-sm text-[#6b7280]"> Du học sinh đã đăng ký</span>
                    </div>
                </div>
            </div>
            <div class="mt-12">
                <h3 class="m-0">Chart</h3>
                <Chart type="bar" :data="chartData" :options="chartOptions" class="h-[30rem]" />
            </div>
        </div>
    </div>
</template>
