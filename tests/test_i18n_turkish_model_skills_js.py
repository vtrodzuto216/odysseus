"""Exercise the real i18n module against a small browser-like DOM.

The test pins Turkish coverage for model/skill controls, including nodes added
later by the UI, while ensuring user-defined model/provider/skill text stays
untouched. Runs through Node's ES module loader, matching the repo's JS tests.
"""
import json
import shutil
import subprocess
from pathlib import Path

import pytest

_REPO = Path(__file__).resolve().parent.parent
_MODULE = _REPO / "static" / "js" / "i18n.js"
_HAS_NODE = shutil.which("node") is not None
_SRC = _MODULE.read_text(encoding="utf-8")

_STUBS = r"""
class FakeText {
  constructor(value) { this.nodeType = 3; this.nodeValue = value; this.parentElement = null; }
}
class FakeElement {
  constructor(tagName = 'div', className = '', attrs = {}) {
    this.nodeType = 1;
    this.tagName = tagName.toLowerCase();
    this.className = className;
    this.attributes = { ...attrs };
    this.children = [];
    this.parentElement = null;
    this.lang = '';
    this.value = '';
  }
  add(child) { child.parentElement = this; this.children.push(child); return child; }
  addText(value) { return this.add(new FakeText(value)); }
  hasAttribute(name) { return Object.prototype.hasOwnProperty.call(this.attributes, name); }
  getAttribute(name) { return this.hasAttribute(name) ? this.attributes[name] : null; }
  setAttribute(name, value) { this.attributes[name] = String(value); }
  matchesSimple(selector) {
    const compound = selector.match(/^([a-z][a-z0-9-]*)?\[([a-z-]+)(?:="([^"]*)")?\]$/i);
    if (compound) {
      const [, tag, attr, value] = compound;
      return (!tag || this.tagName === tag.toLowerCase()) && this.hasAttribute(attr)
        && (value === undefined || this.getAttribute(attr) === value);
    }
    if (selector.startsWith('.')) return this.className.split(/\s+/).includes(selector.slice(1));
    if (selector.startsWith('[')) {
      const match = selector.match(/^\[([a-z-]+)(?:="([^"]*)")?\]$/i);
      return !!match && this.hasAttribute(match[1])
        && (match[2] === undefined || this.getAttribute(match[1]) === match[2]);
    }
    return this.tagName === selector.toLowerCase();
  }
  matchesSelector(selector) {
    const chain = selector.split(/\s+/).filter(Boolean);
    let node = this;
    if (!node.matchesSimple(chain[chain.length - 1])) return false;
    for (let index = chain.length - 2; index >= 0; index--) {
      node = node.parentElement;
      while (node && !node.matchesSimple(chain[index])) node = node.parentElement;
      if (!node) return false;
    }
    return true;
  }
  closest(selectors) {
    const parts = selectors.split(',').map(s => s.trim());
    for (let el = this; el; el = el.parentElement) {
      if (parts.some(selector => el.matchesSelector(selector))) return el;
    }
    return null;
  }
  querySelectorAll(selector) {
    const found = [];
    const visit = node => {
      for (const child of node.children) {
        if (child.nodeType === 1 && (selector === '*' || child.matchesSimple(selector))) found.push(child);
        if (child.nodeType === 1) visit(child);
      }
    };
    visit(this);
    return found;
  }
}

const root = new FakeElement('html');
const languageSelect = new FakeElement('select');
languageSelect.id = 'set-interface-language';
root.add(languageSelect);
const sectionText = new FakeElement('div', 'mp-section-label').addText('Favorites');
root.add(sectionText.parentElement);
const searchInput = new FakeElement('input', '', { placeholder: 'Search models…' });
root.add(searchInput);
const skillTab = new FakeElement('button').addText('Skills');
root.add(skillTab.parentElement);
const addSkill = new FakeElement('button').addText('Add Skill');
root.add(addSkill.parentElement);
const modelName = new FakeElement('span', 'mp-model-name', { title: 'Search' }).addText('Search');
root.add(modelName.parentElement);
const providerName = new FakeElement('span', 'mp-provider-name').addText('Search');
root.add(providerName.parentElement);
const skillName = new FakeElement('code', 'skill-card-name').addText('Search');
root.add(skillName.parentElement);
const skillDescription = new FakeElement('div', 'skill-card-desc', { title: 'Search' }).addText('Search');
root.add(skillDescription.parentElement);
const endpointName = new FakeElement('span', 'models-endpoint-label').addText('Search');
root.add(endpointName.parentElement);
const skillsSearch = new FakeElement('input', '', { placeholder: 'Search skills…', 'aria-label': 'Search skills' });
root.add(skillsSearch);
const skillFilter = new FakeElement('option').addText('Drafts only');
root.add(skillFilter.parentElement);
const skillAudit = new FakeElement('button', '', { title: 'Test every skill, auto-fix the weak ones, flag what still fails' }).addText('Audit');
root.add(skillAudit.parentElement);
const selectedCount = new FakeElement('span').addText('0 Selected');
root.add(selectedCount.parentElement);
const selectedCountDynamic = new FakeElement('span').addText('2 Selected');
root.add(selectedCountDynamic.parentElement);
const modelSettingsRow = new FakeElement('div', 'models-row');
const settingsModelName = new FakeElement('span', 'grow').addText('Search');
modelSettingsRow.add(settingsModelName.parentElement);
root.add(modelSettingsRow);

let observerCallback = null;
globalThis.MutationObserver = class {
  constructor(callback) { observerCallback = callback; }
  observe() {}
};
globalThis.Node = { TEXT_NODE: 3, ELEMENT_NODE: 1 };
globalThis.NodeFilter = { SHOW_TEXT: 4 };
globalThis.CustomEvent = class { constructor(type, init) { this.type = type; this.detail = init?.detail; } };
globalThis.window = { requestAnimationFrame: callback => callback(), setTimeout: callback => callback() };
const store = new Map();
globalThis.localStorage = {
  getItem: key => store.has(key) ? store.get(key) : null,
  setItem: (key, value) => store.set(key, String(value)),
};
globalThis.document = {
  documentElement: root,
  getElementById: id => id === 'set-interface-language' ? languageSelect : null,
  addEventListener() {},
  dispatchEvent() {},
  createTreeWalker(start) {
    const nodes = [];
    const visit = node => {
      for (const child of node.children || []) {
        if (child.nodeType === 3) nodes.push(child);
        else visit(child);
      }
    };
    if (start.nodeType === 3) nodes.push(start); else visit(start);
    let index = 0;
    return { nextNode: () => nodes[index++] || null };
  },
};
"""


def _run() -> dict:
    body = r"""
    initI18n();
    setInterfaceLanguage('tr');
    const dynamicRow = new FakeElement('div', 'mp-section-label');
    const dynamicText = dynamicRow.addText('No matching models');
    root.add(dynamicRow);
    observerCallback([{ type: 'childList', addedNodes: [dynamicRow] }]);
    const result = {
      language: root.lang,
      selector: languageSelect.value,
      modelSection: sectionText.nodeValue,
      modelSearch: searchInput.getAttribute('placeholder'),
      skillSearch: skillsSearch.getAttribute('placeholder'),
      skillSearchAria: skillsSearch.getAttribute('aria-label'),
      skillFilter: skillFilter.nodeValue,
      skillAudit: skillAudit.nodeValue,
      skillAuditTitle: skillAudit.parentElement.getAttribute('title'),
      selectedCount: selectedCount.nodeValue,
      selectedCountDynamic: selectedCountDynamic.nodeValue,
      skillTab: skillTab.nodeValue,
      addSkill: addSkill.nodeValue,
      dynamicModelText: dynamicText.nodeValue,
      modelName: modelName.nodeValue,
      providerName: providerName.nodeValue,
      settingsModelName: settingsModelName.nodeValue,
      modelNameTitle: modelName.parentElement.getAttribute('title'),
      endpointName: endpointName.nodeValue,
      skillName: skillName.nodeValue,
      skillDescription: skillDescription.nodeValue,
      skillDescriptionTitle: skillDescription.parentElement.getAttribute('title'),
    };
    setInterfaceLanguage('en');
    result.dynamicCountRestored = selectedCount.nodeValue;
    result.dynamicCountRestoredPlural = selectedCountDynamic.nodeValue;
    console.log(JSON.stringify(result));
    """
    proc = subprocess.run(
        ["node", "--input-type=module"],
        input=_STUBS + "\n" + _SRC + "\n" + body,
        capture_output=True,
        text=True,
        encoding="utf-8",
        cwd=str(_REPO),
        timeout=30,
    )
    assert proc.returncode == 0, proc.stderr
    return json.loads(proc.stdout.strip())


@pytest.mark.skipif(not _HAS_NODE, reason="node binary not on PATH")
def test_turkish_model_and_skill_ui_translates_dynamic_labels_but_preserves_user_text():
    assert _run() == {
        "language": "tr",
        "selector": "tr",
        "modelSection": "Favoriler",
        "modelSearch": "Modellerde ara…",
        "skillSearch": "Becerilerde ara…",
        "skillSearchAria": "Becerilerde ara",
        "skillFilter": "Yalnızca taslaklar",
        "skillAudit": "Denetle",
        "skillAuditTitle": "Tüm becerileri test et, zayıf olanları otomatik düzelt, başarısız kalanları işaretle",
        "selectedCount": "0 seçildi",
        "selectedCountDynamic": "2 seçildi",
        "skillTab": "Beceriler",
        "addSkill": "Beceri ekle",
        "dynamicModelText": "Eşleşen model yok",
        "modelName": "Search",
        "providerName": "Search",
        "settingsModelName": "Search",
        "modelNameTitle": "Search",
        "endpointName": "Search",
        "skillName": "Search",
        "skillDescription": "Search",
        "skillDescriptionTitle": "Search",
        "dynamicCountRestored": "0 Selected",
        "dynamicCountRestoredPlural": "2 Selected",
    }
