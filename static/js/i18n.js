// Odysseus interface language support.
//
// This first pass intentionally translates interface copy, not user content,
// model/provider names, plugin names, code, or conversation history. New strings
// can be added to the Turkish catalog as the interface is localized in stages.

const STORAGE_KEY = 'odysseus-ui-language';
const LANGUAGE_SELECT_ID = 'set-interface-language';
const ATTRIBUTE_NAMES = ['title', 'placeholder', 'aria-label', 'aria-description', 'alt'];
const IGNORED_TEXT = [
  'script', 'style', 'code', 'pre', 'textarea', 'input', 'select[translate="no"]',
  '[contenteditable="true"]', '[data-i18n-ignore]', '[translate="no"]',
  '.message-content', '.chat-message', '.chat-bubble', '.markdown-body',
  '.session-title', '.session-name', '.model-name', '.provider-name',
  '.mp-model-name', '.mp-provider-name', '.model-switch-ep', '.models-row .grow',
  '.models-endpoint-label',
  '.skill-card-desc', '.email-body', '.document-editor', '.note-editor', '.user-content',
].join(',');
const IGNORED_ATTRIBUTES = [
  'script', 'style', 'code', 'pre', '[contenteditable="true"]',
  '[data-i18n-ignore]', '[translate="no"]', '.message-content', '.chat-message',
  '.chat-bubble', '.markdown-body', '.session-title', '.session-name',
  '.model-name', '.provider-name', '.mp-model-name', '.mp-provider-name',
  '.model-switch-ep', '.models-row .grow', '.skill-card-desc', '.email-body',
  '.models-endpoint-label',
  '.document-editor', '.note-editor', '.user-content',
].join(',');

const CATALOG = Object.freeze({
  en: Object.freeze({}),
  tr: Object.freeze({
    'Odysseus Chat': 'Odysseus Sohbet',
    'Settings': 'Ayarlar',
    'Close settings': 'Ayarları kapat',
    'Fade this window to preview the page behind it': 'Arkada kalan sayfayı görmek için bu pencereyi saydamlaştır',
    'Peek': 'Önizle',
    'Collapse settings navigation': 'Ayarlar gezinmesini daralt',
    'Resize settings navigation': 'Ayarlar gezinmesini yeniden boyutlandır',
    'Find settings…': 'Ayarları bul…',
    'Find settings': 'Ayarlarda ara',
    'Settings search results': 'Ayar arama sonuçları',
    'Add Models': 'Model ekle',
    'Added Models': 'Eklenen modeller',
    'AI Defaults': 'Yapay zekâ varsayılanları',
    'Search': 'Arama',
    'Integrations': 'Entegrasyonlar',
    'Loading models…': 'Modeller yükleniyor…',
    'Refreshing models…': 'Modeller yenileniyor…',
    'Search models…': 'Modellerde ara…',
    'Search models...': 'Modellerde ara...',
    'No models connected': 'Bağlı model yok',
    'No matching models': 'Eşleşen model yok',
    'Favorites': 'Favoriler',
    'Recent': 'Son kullanılanlar',
    'All models': 'Tüm modeller',
    'Local': 'Yerel',
    'Drag to reorder': 'Yeniden sıralamak için sürükleyin',
    'Toggle favorite': 'Favori durumunu değiştir',
    'Add to favorites': 'Favorilere ekle',
    'Remove from favorites': 'Favorilerden kaldır',
    'Favorited': 'Favorilere eklendi',
    'Unfavorited': 'Favorilerden kaldırıldı',
    'Image generation model': 'Görsel oluşturma modeli',
    'Offline': 'Çevrimdışı',
    '(offline)': '(çevrimdışı)',
    '+ Image': '+ Görsel',
    '+ Chat': '+ Sohbet',
    'Refresh models': 'Modelleri yenile',
    'Model refresh failed': 'Model listesi yenilenemedi',
    'No models found': 'Model bulunamadı',
    '(scan failed)': '(tarama başarısız)',
    'Loading providers…': 'Sağlayıcılar yükleniyor…',
    'Select model': 'Model seç',
    'Add model': 'Model ekle',
    'Skills': 'Beceriler',
    'Skill': 'Beceri',
    'Add Skill': 'Beceri ekle',
    'Import': 'İçe aktar',
    'Export': 'Dışa aktar',
    'Import URL': 'İçe aktarma URL’si',
    'Skill import URL': 'Beceri içe aktarma URL’si',
    'Import skill from URL': 'Beceriyi URL’den içe aktar',
    'Title': 'Başlık',
    'When to use': 'Ne zaman kullanılmalı',
    'How': 'Nasıl',
    'Tags': 'Etiketler',
    'Publish': 'Yayımla',
    'Unpublish': 'Yayından kaldır',
    'Select': 'Seç',
    'Test': 'Test et',
    'Audit': 'Denetle',
    'Actions': 'İşlemler',
    'Collapse': 'Daralt',
    'Run': 'Çalıştır',
    'Approve': 'Onayla',
    'Revert': 'Geri al',
    'Restore the original shipped instructions': 'Uygulamayla gelen özgün yönergeleri geri yükle',
    'Skills search': 'Beceri arama',
    'Search skills…': 'Becerilerde ara…',
    'Search skills...': 'Becerilerde ara...',
    'Search skills': 'Becerilerde ara',
    'Drafts only': 'Yalnızca taslaklar',
    'Test every skill, auto-fix the weak ones, flag what still fails': 'Tüm becerileri test et, zayıf olanları otomatik düzelt, başarısız kalanları işaretle',
    'No skills yet, use agent for it to auto extract them.': 'Henüz beceri yok; otomatik olarak çıkarması için ajanı kullanın.',
    'built-in': 'yerleşik',
    'Built-in': 'Yerleşik',
    'edited': 'düzenlendi',
    'draft': 'taslak',
    'published': 'yayımlandı',
    'legacy': 'eski',
    'teacher-created': 'öğretmen tarafından oluşturuldu',
    'teacher-fixed': 'öğretmen tarafından düzeltildi',
    'generic': 'genel',
    'possibly-irrelevant': 'muhtemelen gereksiz',
    'recommended': 'önerilen',
    'lower-priority': 'düşük öncelikli',
    'Passed an automated test': 'Otomatik testten geçti',
    'You have edited this built-in capability': 'Bu yerleşik yeteneği düzenlediniz',
    'Built-in capability updated': 'Yerleşik yetenek güncellendi',
    'Reverted to default': 'Varsayılana döndürüldü',
    'Email': 'E-posta',
    'Reminders': 'Hatırlatıcılar',
    'Appearance': 'Görünüm',
    'Shortcuts': 'Kısayollar',
    'Account': 'Hesap',
    'Agent Tools': 'Ajan araçları',
    'Users': 'Kullanıcılar',
    'System': 'Sistem',
    'Admin': 'Yönetici',
    'Interface language': 'Arayüz dili',
    'Language': 'Dil',
    'Choose a language for the Odysseus interface. Turkish translations for navigation, settings, and common model/tool controls are being introduced in stages; provider and plugin names stay unchanged.': 'Odysseus arayüzü için bir dil seçin. Gezinme, ayarlar ve yaygın model/araç kontrollerinin Türkçe çevirileri aşamalı olarak ekleniyor; sağlayıcı ve eklenti adları değiştirilmez.',
    'Sidebar': 'Kenar çubuğu',
    'Brand name': 'Marka adı',
    'New Chat': 'Yeni sohbet',
    'Chats': 'Sohbetler',
    'Chat history list': 'Sohbet geçmişi listesi',
    'Tools': 'Araçlar',
    'Whole section (header + all tools)': 'Bölümün tamamı (başlık ve tüm araçlar)',
    'Brain': 'Bellek',
    'Calendar': 'Takvim',
    'Compare': 'Karşılaştır',
    'Cookbook': 'Tarifler',
    'Deep Research': 'Derin araştırma',
    'Gallery': 'Galeri',
    'Library': 'Kütüphane',
    'Notes': 'Notlar',
    'Tasks': 'Görevler',
    'Theme': 'Tema',
    'User': 'Kullanıcı',
    'Avatar & name': 'Avatar ve ad',
    'Settings Button': 'Ayarlar düğmesi',
    'Cog next to user — re-open with /settings': 'Kullanıcının yanındaki dişli — /settings ile yeniden açın',
    'Chat Area': 'Sohbet alanı',
    'Reset this section to defaults': 'Bu bölümü varsayılanlara sıfırla',
    'Reset Sidebar to defaults': 'Kenar çubuğunu varsayılanlara sıfırla',
    'Reset Chat Area to defaults': 'Sohbet alanını varsayılanlara sıfırla',
    'Default Chat Model': 'Varsayılan sohbet modeli',
    'The model used when creating a new chat session.': 'Yeni bir sohbet oluştururken kullanılacak model.',
    'Endpoint': 'Uç nokta',
    'Model': 'Model',
    'Utility Model': 'Yardımcı model',
    '(Recommended: Local Endpoint)': '(Önerilen: Yerel uç nokta)',
    'Runs background tasks (compaction, cleanup, auto-naming, retrieving memories from files) on a small/local model instead of your chat model. Leave blank to use the chat model.': 'Arka plan görevlerini (özetleme, temizleme, otomatik adlandırma ve dosyalardan bellek alma) sohbet modeliniz yerine küçük/yerel bir modelde çalıştırır. Sohbet modelini kullanmak için boş bırakın.',
    'Fallbacks': 'Yedek modeller',
    'Default': 'Varsayılan',
    'Search provider': 'Arama sağlayıcısı',
    'Search the web': 'Web’de ara',
    'Search settings': 'Arama ayarları',
    'Active': 'Etkin',
    'Saved': 'Kaydedildi',
    'Save': 'Kaydet',
    'Save changes': 'Değişiklikleri kaydet',
    'Failed to save': 'Kaydedilemedi',
    'Cancel': 'İptal',
    'Close': 'Kapat',
    'Delete': 'Sil',
    'Edit': 'Düzenle',
    'Add': 'Ekle',
    'Remove': 'Kaldır',
    'Refresh': 'Yenile',
    'Apply': 'Uygula',
    'Reset': 'Sıfırla',
    'Enable': 'Etkinleştir',
    'Disable': 'Devre dışı bırak',
    'Enabled': 'Etkin',
    'Disabled': 'Devre dışı',
    'Loading…': 'Yükleniyor…',
    'No results': 'Sonuç yok',
    'No models available': 'Kullanılabilir model yok',
    'No tools available': 'Kullanılabilir araç yok',
    'Optional': 'İsteğe bağlı',
    'Required': 'Zorunlu',
    'Status': 'Durum',
    'Plugin': 'Eklenti',
    'Plugins': 'Eklentiler',
    'Extensions': 'Uzantılar',
    'Built-in tools': 'Yerleşik araçlar',
    'Manage tools': 'Araçları yönet',
    'Manage plugins': 'Eklentileri yönet',
    'Tool approval': 'Araç onayı',
    'Require approval': 'Onay gerektir',
    'New': 'Yeni',
    'Chat': 'Sohbet',
    'Docs': 'Belgeler',
    'Research': 'Araştırma',
    'Search…': 'Ara…',
    'Type a message…': 'Bir mesaj yazın…',
    'Send': 'Gönder',
    'Stop': 'Durdur',
    'Stop generating': 'Üretimi durdur',
    'Select a model': 'Bir model seçin',
    'Choose a model': 'Model seçin',
    'Sign in': 'Giriş yap',
    'Sign out': 'Oturumu kapat',
    'Logout': 'Çıkış yap',
  }),
});

const textSources = new WeakMap();
const attributeSources = new WeakMap();
const translatedValues = new Set(Object.values(CATALOG.tr));
let currentLocale = 'en';
let observer = null;
let pendingNodes = new Set();
let scanScheduled = false;

function normalizeLocale(value) {
  return value === 'tr' ? 'tr' : 'en';
}

function shouldIgnoreText(node) {
  const parent = node && node.parentElement;
  return !parent || !!parent.closest(IGNORED_TEXT);
}

function sourceValue(current, previous) {
  if (previous !== undefined && (current === previous || translatedValues.has(current))) {
    return previous;
  }
  return current;
}

function translateValue(source, locale) {
  if (locale === 'en') return source;
  const leading = source.match(/^\s*/)?.[0] || '';
  const trailing = source.match(/\s*$/)?.[0] || '';
  const key = source.slice(leading.length, source.length - trailing.length);
  if (!key) return source;
  const selectedCount = key.match(/^(\d+) Selected$/);
  if (selectedCount) {
    const translatedCount = `${leading}${selectedCount[1]} seçildi${trailing}`;
    translatedValues.add(translatedCount);
    return translatedCount;
  }
  const translated = CATALOG[locale][key];
  return translated ? `${leading}${translated}${trailing}` : source;
}

function translateTextNode(node) {
  if (!node || node.nodeType !== Node.TEXT_NODE || shouldIgnoreText(node)) return;
  const current = node.nodeValue || '';
  if (!current.trim()) return;
  const source = sourceValue(current, textSources.get(node));
  textSources.set(node, source);
  const translated = translateValue(source, currentLocale);
  if (current !== translated) node.nodeValue = translated;
}

function translateAttributes(element) {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) return;
  if (element.closest(IGNORED_ATTRIBUTES)) return;
  let sources = attributeSources.get(element);
  if (!sources) {
    sources = new Map();
    attributeSources.set(element, sources);
  }
  for (const name of ATTRIBUTE_NAMES) {
    if (!element.hasAttribute(name)) continue;
    const current = element.getAttribute(name) || '';
    const source = sourceValue(current, sources.get(name));
    sources.set(name, source);
    const translated = translateValue(source, currentLocale);
    if (current !== translated) element.setAttribute(name, translated);
  }
}

function scan(root) {
  if (!root) return;
  if (root.nodeType === Node.TEXT_NODE) {
    translateTextNode(root);
    return;
  }
  if (root.nodeType === Node.ELEMENT_NODE) translateAttributes(root);
  if (typeof root.querySelectorAll === 'function') {
    root.querySelectorAll('*').forEach(translateAttributes);
  }
  const tree = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = tree.nextNode())) translateTextNode(node);
}

function queueScan(node) {
  if (!node) return;
  pendingNodes.add(node);
  if (scanScheduled) return;
  scanScheduled = true;
  const schedule = callback => window.requestAnimationFrame
    ? window.requestAnimationFrame(callback)
    : window.setTimeout(callback, 0);
  schedule(() => {
    scanScheduled = false;
    const nodes = Array.from(pendingNodes);
    pendingNodes = new Set();
    nodes.forEach(scan);
  });
}

function setLanguage(value, { persist = true } = {}) {
  currentLocale = normalizeLocale(value);
  if (persist) {
    try { localStorage.setItem(STORAGE_KEY, currentLocale); } catch (_) {}
  }
  document.documentElement.lang = currentLocale;
  const selector = document.getElementById(LANGUAGE_SELECT_ID);
  if (selector) selector.value = currentLocale;
  scan(document.documentElement);
  document.dispatchEvent(new CustomEvent('odysseus:languagechange', {
    detail: { language: currentLocale },
  }));
}

export function getInterfaceLanguage() {
  return currentLocale;
}

export function initI18n() {
  if (observer) return;
  let saved = 'en';
  try { saved = localStorage.getItem(STORAGE_KEY) || 'en'; } catch (_) {}
  currentLocale = normalizeLocale(saved);

  document.addEventListener('change', event => {
    if (event.target && event.target.id === LANGUAGE_SELECT_ID) {
      setLanguage(event.target.value);
    }
  });

  scan(document.documentElement);
  document.documentElement.lang = currentLocale;
  const selector = document.getElementById(LANGUAGE_SELECT_ID);
  if (selector) selector.value = currentLocale;

  observer = new MutationObserver(records => {
    records.forEach(record => {
      if (record.type === 'attributes') {
        translateAttributes(record.target);
      } else if (record.type === 'characterData') {
        queueScan(record.target);
      } else {
        record.addedNodes.forEach(queueScan);
      }
    });
  });
  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ATTRIBUTE_NAMES,
  });
}

export function setInterfaceLanguage(value) {
  setLanguage(value);
}
