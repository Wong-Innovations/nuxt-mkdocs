<template>
  <NavBar :nav="topNav" :active="activeTopNavIndex" :mkdocs="mkdocs" />
  <main>
    <ContentAside :nav="sideNav" />
    <div class="content-doc">
      <ContentDoc />
    </div>
  </main>
</template>

<script setup>
const route = useRoute();
const router = useRouter();

const mkdocs = ref({});
const topNav = ref([]);
const activeTopNavIndex = ref(0);
const fullNav = ref([]);
const sideNav = ref({});

mkdocs.value = await queryContent("/mkdocs").findOne();

onMounted(() => {
  activeTopNavIndex.value = topNav.value.findIndex((item) => {
    console.log(route.path, item.route);
    return route.path == router.resolve(item.route).path;
  });
  console.log(
    topNav.value,
    topNav.value.findIndex(
      (item) => route.path == router.resolve(item.route).path
    ),
    fullNav.value[activeTopNavIndex.value]
  );
  sideNav.value = fullNav.value[activeTopNavIndex.value].children;
});

watch(
  route,
  () => {
    activeTopNavIndex.value = topNav.value.findIndex(
      (item) => route.path == router.resolve(item.route).path
    );
    // sideNav.value = fullNav.value[activeTopNavIndex.value];
  },
  { immediate: true }
);

const filenameToRoute = (filename) => {
  let url = "/";
  filename.split("/").forEach((el) => {
    if (el != "index.md") url = url.concat(el.split(".md")[0]);
    url = url.concat("/");
  });
  return url.slice(0, -1);
};

mkdocs.value.nav.forEach((topSection) => {
  for (const [label, value] of Object.entries(topSection)) {
    topNav.value.push({
      label: label,
      route:
        typeof value[0] == "string"
          ? filenameToRoute(value[0])
          : filenameToRoute(Object.values(value[0])[0]),
    });
  }
});

// wrote this code very late at night, while sick. Probably a much better and cleaner way to do this.
const recursivlyParseNav = (navTree, depth = 0) => {
  if (Array.isArray(navTree)) {
    let parsed = [];
    for (let i = 0; i < navTree.length; i++) {
      const value = recursivlyParseNav(navTree[i], depth + 1);
      parsed.push({
        key: `${depth}-${i}`,
        ...value,
      });
    }
    return parsed;
  } else if (typeof navTree == "string") {
    return filenameToRoute(navTree);
  } else {
    // object case
    for (const [label, navTreeNode] of Object.entries(navTree)) {
      // each object should be a single label -> mdFile | object[] pairing meaning we can return the "first" key:value pair
      const value = recursivlyParseNav(navTreeNode, depth + 1);
      if (Array.isArray(value)) {
        return {
          label: label,
          children: value,
        };
      } else {
        return {
          label: label,
          data: value,
        };
      }
    }
  }
};

fullNav.value = recursivlyParseNav(mkdocs.value.nav);
</script>

<style>
body {
  background-color: var(--surface-ground);
}
main {
  max-width: 80rem;
  margin: 58px auto 0 auto;
  display: flex;
  align-items: flex-start;
}
.content-doc {
  margin-left: 210px;
  padding-left: 8px;
}
</style>
