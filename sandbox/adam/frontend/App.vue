<template>
    <section  class="index">
        <NavTop></NavTop>
        <LayoutContainer>
            <FullContentContainer><MapTest></MapTest></FullContentContainer>
        </LayoutContainer>
    </section >
</template>




<script>
import NavTop from './NavTop.vue'
import LayoutContainer from './LayoutContainer.vue'
import FullContentContainer from './FullContentContainer.vue';
import MapTest from "./MapTest.vue";
export default
{
    name: "index",
    components: {NavTop, LayoutContainer, FullContentContainer, MapTest},
};
</script>




<style scoped>
</style>