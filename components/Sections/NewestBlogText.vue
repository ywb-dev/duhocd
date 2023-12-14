<template>
    <section>
        <div class="relative container newest-blog-text">
            <div class="blog-text__inner">
                <TitleSection heading="Thông Tin Du Học Mới Nhất" link="#" />
                <div class="flex flex-col py-8 md:py-12">
                    <NuxtLink to="/" class="flex md:items-center flex-col md:flex-row mb-4">
                        <p class="text-desc flex-1 text-base text-black font-medium">Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. agittis aliquam malesuada bibendum arcu vitae elementum curabitur agittis aliquam malesuada bibendum arcu vitae elementum curabitur agittis aliquam malesuada bibendum arcu vitae elementum curabitur</p>
                        <p class="time-desc">18-08-2023</p>
                    </NuxtLink>
                    <NuxtLink to="/" class="flex md:items-center flex-col md:flex-row mb-4">
                        <p class="text-desc flex-1 text-base text-black font-medium">Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur.</p>
                        <p class="time-desc">18-08-2023</p>
                    </NuxtLink>
                    <NuxtLink to="/" class="flex md:items-center flex-col md:flex-row mb-4">
                        <p class="text-desc flex-1 text-base text-black font-medium">Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur.</p>
                        <p class="time-desc">18-08-2023</p>
                    </NuxtLink>
                    <NuxtLink to="/" class="flex md:items-center flex-col md:flex-row mb-4">
                        <p class="text-desc flex-1 text-base text-black font-medium">Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur.</p>
                        <p class="time-desc">18-08-2023</p>
                    </NuxtLink>
                    <NuxtLink to="/" class="flex md:items-center flex-col md:flex-row mb-4">
                        <p class="text-desc flex-1 text-base text-black font-medium">Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur.</p>
                        <p class="time-desc">18-08-2023</p>
                    </NuxtLink>
            
                </div>
            </div>
        </div>
    </section>
</template>
<style scoped>
    p {
        margin: 0;
    }
    .text-desc {
        border-bottom: 1px solid #C8C8C8;
        padding-bottom: 10px;
        margin-right: 122px;
        font-weight: 500;
        text-overflow: ellipsis;
        overflow: hidden; 
        white-space: initial;
        height: 54px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .time-desc {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 38px;
        width: 130px;
        font-size: 13px;
        line-height: 20px;
        font-weight: 300;
        color: #2A2A2A;
        text-align: center;
        border-radius: 8px;
        border: 1px solid #1B80CA;
        margin-left: auto;
    }

    @media (max-width: 767px) {
        .text-desc {
            margin-right: 0;
        }

        .time-desc {
            margin-top: 16px;
        }
    }
</style>