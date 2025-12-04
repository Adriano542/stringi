const opisy = [
  'length - właściwość odczytująca długość tekstu',
  'Metoda charAt() służy do pobrania znaku na danej pozycji',
  'Metoda charCodeAt() zwraca nam kod ASCII znaku na pozycji podanej w parametrze',
  'Metoda toUpperCase() służy  do zamieniania tekstu na duże litery.',
  'Metody toLowerCase() służy  do zamieniania tekstu na małe litery.',
  'Metoda indexOf służy do podawania pozycji szukanego fragmentu w tekście. Jeżeli zwróconą wartością jest -1, to szukanego tekstu nie ma',
  'Metoda lastIndexOf służy do podawania ostatniego wystąpienia szukanego fragmentu w tekście. Jeżeli zwróconą wartością jest -1, to szukanego tekstu nie ma',
  'Metoda substr(start, dlugosc) służy do pobierania kawałka tekstu. Pierwszym jej parametrem jest początek pobieranego kawałka tekstu, a drugi opcjonalny wskazuje długość pobieranego tekstu. Jeżeli drugi parametr nie zostanie podany, wówczas pobierany kawałek będzie pobierany do końca tekstu.',
  'Metoda substring(start, stop) ma bardzo podobne działanie co powyższa. Różnicą jest drugi parametr, który zamiast długości wyznacza miejsce końca pobieranego kawałka. Jeżeli drugi parametr nie zostanie podany, wtedy kawałek będzie pobierany do końca tekstu. Jeżeli zostaną podane oba parametry, ale drugi będzie mniejszy od pierwszego, wtedy automatycznie zostaną one zamienione miejscami.',
  'Tak samo jak w przypadku tablic, tak i w przypadku zmiennych tekstowych możemy skorzystać z metody slice(start, stop), która tnie nasz tekst i tworzy w ten sposób nowy. Jej działanie jest praktycznie identyczne do działania metody substring(), jednak występują małe różnice. Jeżeli drugi argument będzie mniejszy od pierwszego, wtedy w przeciwieństwie do substring() argumenty nie zostaną zamienione miejscami.',
  'Metoda replace(ciag_szukany, zamieniony) służy do zamiany szukanych kawałków tekstu na inny tekst, możemy używać wyrażeń regularnych',
];

// mapowanie
const map = {
  length: 0, charAt: 1, charCodeAt: 2, toUpperCase: 3, toLowerCase: 4,
  indexOf: 5, lastIndexOf: 6, substr: 7, substring: 8, slice: 9, replace: 10
};

function parseNumbersFromRaw(raw) {
  if (!raw) return [];
  // dopuszczamy dowolne oddzielenie spacją
  return raw.trim().split(/\s+/).map(s => {
    const n = Number(s);
    return Number.isNaN(n) ? null : n;
  });
}

function parseReplaceParts(raw) {
  if (!raw) return [null, null];
  // najpierw spróbuj rozdzielić po dedykowanych delimiterach
  let parts = raw.split('->');
  if (parts.length === 1) parts = raw.split('|');
  if (parts.length === 1) parts = raw.split('||');
  if (parts.length === 1 && raw.includes(',')) parts = raw.split(',');
  // dalej - jeśli mamy jedno element i zawiera spacje, przyjmij pierwszy wyraz jako szukany, reszta jako zamiennik
  if (parts.length === 1) {
    const toks = raw.trim().split(/\s+/);
    if (toks.length === 1) return [toks[0], '']; // tylko szukany - zamiennik pusty
    const search = toks.shift();
    const replacement = toks.join(' ');
    return [search, replacement];
  }
  // usuń ewentualne białe znaki na brzegach
  return [parts[0].trim(), (parts[1] ?? '').trim()];
}

function runMethod(method) {
  const text = document.getElementById("textInput").value;
  const raw = document.getElementById("paramInput").value.trim();
  let result = '';
  try {
    switch (method) {
      case 'length':
        result = text.length;
        break;

      case 'charAt': {
        const idx = parseInt(raw, 10);
        if (Number.isNaN(idx)) { result = 'Podaj indeks (liczbę)'; break; }
        result = text.charAt(idx);
        break;
      }

      case 'charCodeAt': {
        const idx = parseInt(raw, 10);
        if (Number.isNaN(idx)) { result = 'Podaj indeks (liczbę)'; break; }
        const code = text.charCodeAt(idx);
        result = Number.isNaN(code) ? 'Brak znaku na tej pozycji' : code;
        break;
      }

      case 'toUpperCase':
        result = text.toUpperCase();
        break;

      case 'toLowerCase':
        result = text.toLowerCase();
        break;

      case 'indexOf':
        // treat whole raw as needle (including spaces)
        result = text.indexOf(raw);
        break;

      case 'lastIndexOf':
        result = text.lastIndexOf(raw);
        break;

      case 'substr': {
        // substr(start, length)
        const nums = parseNumbersFromRaw(raw);
        const start = (nums[0] === null || nums.length === 0) ? 0 : nums[0];
        const len = (nums[1] === null || nums[1] === undefined) ? undefined : nums[1];
        result = (len === undefined) ? text.substr(start) : text.substr(start, len);
        break;
      }

      case 'substring': {
        const nums = parseNumbersFromRaw(raw);
        const a = nums[0] ?? 0;
        const b = (nums[1] === null || nums[1] === undefined) ? undefined : nums[1];
        result = (b === undefined) ? text.substring(a) : text.substring(a, b);
        break;
      }

      case 'slice': {
        const nums = parseNumbersFromRaw(raw);
        const a = nums[0] ?? 0;
        const b = (nums[1] === null || nums[1] === undefined) ? undefined : nums[1];
        result = (b === undefined) ? text.slice(a) : text.slice(a, b);
        break;
      }

      case 'replace': {
        // support: "old->new", "old|new", or "old new with spaces" (first token = old, rest = new)
        const [search, replacement] = parseReplaceParts(raw);
        if (!search) { result = 'Podaj ciąg do zastąpienia i opcjonalnie nowy (np. "kot->pies" lub "kot pies").'; break; }
        // jeśli user chce regex, mógł wpisać /pattern/flags - ale bez parsowania regex automatycznego dla bezpieczeństwa użyj literalnego
        result = text.replace(search, replacement);
        break;
      }

      default:
        result = 'Nieznana metoda';
    }
  } catch (e) {
    result = 'Błąd wykonania: ' + e.message;
  }

  // ustaw wyniki i opis
  document.getElementById("resultTitle").textContent = `metoda ${method}(), wynik:`;
  document.getElementById("resultValue").textContent = String(result);

  const idxDesc = map[method];
  if (typeof idxDesc !== 'undefined') {
    document.getElementById("descText").textContent = opisy[idxDesc];
  } else {
    document.getElementById("descText").textContent = '';
  }
}
