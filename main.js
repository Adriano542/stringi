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

// Mapowanie nazw metod na indeks opisu
const map = {
  length: 0,
  charAt: 1,
  charCodeAt: 2,
  toUpperCase: 3,
  toLowerCase: 4,
  indexOf: 5,
  lastIndexOf: 6,
  substr: 7,
  substring: 8,
  slice: 9,
  replace: 10
};

function runMethod(method) {
    const text = document.getElementById("textInput").value;
    const params = document.getElementById("paramInput").value.split(" ");

    let result;

    try {
        switch (method) {
            case "length":
                result = text.length;
                break;

            case "charAt":
                result = text.charAt(Number(params[0]));
                break;

            case "charCodeAt":
                result = text.charCodeAt(Number(params[0]));
                break;

            case "toUpperCase":
                result = text.toUpperCase();
                break;

            case "toLowerCase":
                result = text.toLowerCase();
                break;

            case "indexOf":
                result = text.indexOf(params.join(" "));
                break;

            case "lastIndexOf":
                result = text.lastIndexOf(params.join(" "));
                break;

            case "substr":
                result = text.substr(Number(params[0]), Number(params[1]));
                break;

            case "substring":
                result = text.substring(Number(params[0]), Number(params[1]));
                break;

            case "slice":
                result = text.slice(Number(params[0]), Number(params[1]));
                break;

            case "replace":
                result = text.replace(params[0], params[1] ?? "");
                break;

            default:
                result = "Błąd metody";
        }
    } catch {
        result = "Niepoprawne parametry!";
    }

    document.getElementById("resultTitle").textContent =
        `metoda ${method}(), wynik:`;

    document.getElementById("resultValue").textContent = result;

    // Wstawienie odpowiedniego opisu
    document.getElementById("descText").textContent = opisy[map[method]];
}
