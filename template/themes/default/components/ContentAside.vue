<template>
  <aside>
    <Tree
      :value="props.nav"
      v-model:selectionKeys="selectedKey"
      selectionMode="single"
      @nodeSelect="onNodeSelect"
      class="tree-aside"
    />
  </aside>
</template>

<script setup>
const props = defineProps({
  nav: Object,
});

const router = useRouter();
const route = useRoute();

const selectedKey = ref(null);
// const items = ref([
//   {
//     key: "0-0",
//     label: "Welcome to GroovyScript",
//     children: [
//       { key: "0-1", label: "Features", data: "" },
//       { key: "0-2", label: "Where to go?", data: "" },
//     ],
//   },
//   {
//     key: "1-0",
//     label: "Getting started",
//     children: [
//       { key: "1-1", label: "Groovy Log", data: "" },
//       { key: "1-2", label: "Run Config" },
//       { key: "1-3", label: "Pack name and id" },
//       { key: "1-4", label: "Importaint Infos" },
//     ],
//   },
// ]);

const items = ref([
  {
    key: "0-0",
    label: "Welcome to GroovyScript",
    data: "/about",
  },
  {
    key: "1-0",
    label: "Getting started",
    children: [
      { key: "1-1", label: "Groovy Log", data: "" },
      { key: "1-2", label: "Run Config" },
      { key: "1-3", label: "Pack name and id" },
      { key: "1-4", label: "Importaint Infos" },
    ],
  },
]);

onMounted(() => {
  console.log(props.nav);
});

// onMounted(() => {
//   let matched = false;
//   for (let )
//   selectedKey.value = items.value.findIndex(
//     (item) => route.path === router.resolve(item.route).path
//   );
// });

// watch(
//   route,
//   () => {
//     selectedKey.value = items.value.findIndex(
//       (item) => route.path === router.resolve(item.route).path
//     );
//   },
//   { immediate: true }
// );

const onNodeSelect = (node) => {
  // navigateTo(node.data);
};
</script>

<style>
aside {
  width: 210px;
  position: fixed;
  bottom: 0;
  height: calc(100% - 58px); /* full height of the viewport - NavBar height */
  overflow-y: auto;
}
.tree-aside {
  background-color: transparent;
  border: none;
  padding-left: 0;
  padding-right: 0;
}
.p-treenode-content {
  flex-direction: row-reverse;
  padding: 0.25rem 0;
  font-size: 10pt;
  color: var(--text-color);
  font-weight: 500;
}
.p-treenode-leaf {
  padding: 0;
}
.p-treenode-leaf .p-treenode-content {
  padding: 0;
}
.p-treenode-children {
  padding-left: 0;
}
.p-tree .p-highlight {
  background-color: transparent;
  box-shadow: none;
}
.p-tree-toggler {
  margin-left: auto;
  margin-right: 0;
}
.p-treenode-label:hover {
  cursor: default;
}
.p-treenode-children .p-treenode-leaf .p-treenode-selectable {
  border-left: 1px solid var(--surface-d);
  border-radius: 0;
  padding: 0 0 0 0.75rem;
  margin: 0 0 0 0.75rem;
}
.p-treenode-children .p-treenode-leaf .p-treenode-selectable:hover {
  border-left: 1px solid var(--text-color);
}
.p-treenode-children .p-treenode-leaf .p-highlight {
  border-left: 1px solid var(--primary-color);
  background-color: transparent;
  color: var(--primary-color);
}
.p-treenode-children .p-treenode-leaf .p-highlight:hover {
  border-left: 1px solid var(--primary-color);
  background-color: var(--surface-hover);
}
</style>
