import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Chat Models","description":"","frontmatter":{"title":"Chat Models"},"headers":[],"relativePath":"langchain/chat-models.md","filePath":"langchain/chat-models.md"}');
const _sfc_main = { name: "langchain/chat-models.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="chat-models" tabindex="-1">Chat Models <a class="header-anchor" href="#chat-models" aria-label="Permalink to &quot;Chat Models&quot;">​</a></h1><p>Content coming soon.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("langchain/chat-models.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const chatModels = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  chatModels as default
};
