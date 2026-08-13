import { resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{"layout":"home","hero":{"name":"NextGen AI","text":"AI Engineering শেখার বাংলা গাইড","tagline":"LangChain, LangGraph, DRF, এবং AI Engineering — বাংলায়, উদাহরণ সহ।","actions":[{"theme":"brand","text":"LangChain শুরু করো","link":"/langchain/"},{"theme":"alt","text":"DRF শুরু করো","link":"/drf/introduction"}]},"features":[{"icon":"🔗","title":"Orchestration Frameworks","details":"LangChain, LlamaIndex, LangGraph — কোনটা কখন ব্যবহার করবে, বাস্তব কোড সহ।"},{"icon":"🐍","title":"Django REST Framework","details":"APIView থেকে ModelViewSet পর্যন্ত — একটাই Blog API প্রজেক্ট দিয়ে সম্পূর্ণ শেখা।"},{"icon":"🧠","title":"AI Interview Prep","details":"RAG, Agentic AI, এবং ML fundamentals — চাকরির ইন্টারভিউর জন্য প্রস্তুতি।"}]},"headers":[],"relativePath":"index.md","filePath":"index.md"}');
const _sfc_main = { name: "index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  const _component_TypewriterTerminal = resolveComponent("TypewriterTerminal");
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_ClientOnly, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_TypewriterTerminal, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_TypewriterTerminal)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
