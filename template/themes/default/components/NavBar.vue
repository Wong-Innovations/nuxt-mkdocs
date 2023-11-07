<template>
  <header>
    <div class="head-wrapper">
      <div class="site-name">
        <p>{{ props.mkdocs.site_name }}</p>
      </div>
      <TabMenu v-model:activeIndex="activeIndex" :model="props.nav">
        <template #item="{ label, item, props }">
          <NuxtLink v-slot="routerProps" :to="item.route" custom>
            <a
              :href="routerProps.href"
              v-bind="props.action"
              @click="($event) => routerProps.navigate($event)"
              @keydown.enter.space="($event) => routerProps.navigate($event)"
            >
              <span v-bind="props.label">{{ label }}</span>
            </a>
          </NuxtLink>
        </template>
      </TabMenu>
      <a class="git-link" :href="props.mkdocs.repo_url">
        <div class="git-container">
          <GitIcon class="icon git-icon" />
          <div class="git-subcontainer">
            <p class="git-reponame">{{ props.mkdocs.repo_name }}</p>
            <div class="git-meta">
              <GitStar class="icon" />
              <p>{{ git_info.stargazers_count }}</p>
              <GitForkIcon class="icon" />
              <p>{{ git_info.forks_count }}</p>
            </div>
          </div>
        </div>
      </a>
    </div>
  </header>
</template>

<script setup>
const props = defineProps({
  mkdocs: Object,
  nav: Array,
  active: Number,
});

const activeIndex = computed({
  get() {
    return props.active;
  },
  set(value) {}, // do nothing since active already watches the route. (needed to silence set failed warns)
});

const git_info = ref({});

const { data } = await useFetch(
  `https://api.github.com/repos/${props.mkdocs.repo_name}`
);

git_info.value = data.value;
</script>

<style>
.head-wrapper {
  display: flex;
  justify-content: space-between;
  max-width: 80rem;
  margin: 0 auto;
}
header {
  position: fixed;
  top: 0;
  width: 99%;
  height: 58px;
  border-bottom: 2px solid var(--surface-d);
  z-index: 0;
  background-color: var(--surface-ground);
}
.p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link {
  background: transparent;
}
.site-name p {
  font-size: large;
  font-weight: 500;
}
.git-link {
  text-decoration: none;
  color: var(--text-color);
  font-size: small;
}
header .icon {
  fill: var(--text-color);
}
header .git-icon {
  transform: scale(1.5);
  display: inline-block;
  margin-right: 10px;
  position: relative;
  top: -10px;
}
.git-container {
  display: block;
}
.git-subcontainer {
  display: inline-block;
  max-height: 58px;
}
.git-reponame {
  margin-bottom: 5px;
  margin-top: 10px;
}
.git-meta {
  display: flex;
}
.git-meta * {
  display: inline-block;
}
.git-meta p {
  margin: 0 15px 0 4px;
}
</style>
