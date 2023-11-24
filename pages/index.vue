<template>
       <div class="card flex justify-content-center flex-wrap gap-3">
        <PrimeButton label="Primary" />
        <PrimeButton label="Secondary" severity="secondary" />
        <PrimeButton label="Success" severity="success" />
        <PrimeButton label="Info" severity="info" />
        <PrimeButton label="Warning" severity="warning" />
        <PrimeButton label="Help" severity="help" />
        <PrimeButton label="Danger" severity="danger" />
    </div>
    <NuxtLink to="/admin">Admin</NuxtLink>
</template>