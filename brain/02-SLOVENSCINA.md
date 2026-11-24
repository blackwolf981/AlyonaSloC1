# ✍️ Pravila za slovenščino, slog in oblikovanje nalog (Codex)

Ta dokument vsebuje stroga navodila za učitelja slovenščine (ChatGPT Codex) pri pripravi, lektoriranju in vnosu učnih nalog v datoteko naloge.json.

---

## 1. Jezikovna norma in viri
* **Normativni viri:** Vse naloge, razlage in rešitve morajo brezpogojno slediti sodobnemu slovenskemu knjižnemu jeziku po:
  * Slovenskem pravopisu (SP 2001) in veljavnem ePravopisu
  * Slovarju slovenskega knjižnega jezika (SSKJ2 / Fran)
  * Slovenski slovnici (Toporišič idr.)
* **Raven C1 / B2:** Naloge ne smejo vsebovati banalnih ali osnovnošolskih pravil. Poudarek je na:
  * Zahtevnejši vezljivosti (glagolski in samostalniški vezniki)
  * Rodilniku zanikanja in delnem rodilniku v kompleksnih stavkih
  * Frazeologiji, pregovorih in stalnih besednih zvezah v prenesenem pomenu
  * Glagolskem vidu v odvisnikih in pogojnih zvezah
  * Dvojini v zahtevnih ujemanjih (večsamostalniški zvezki)
  * Skladnji (polstavčne strukture z deležji in deležniki)
  * Slogovni ustreznosti in registrih (knjižnozborno vs. pogovorno/publicistično)

---

## 2. Formatiranje in shema nalog (naloge.json)
1. **Enolični ID:** Vsaka naloga mora imeti enoličen ID v obliki C1-[KROG]-[T] (npr. C1-VEZ-001, C1-ROD-007).
2. **Oblikovanje vrzeli (___):**
   * V polju kontekst mora biti vrzel označena z vsaj tremi podčrtaji (___).
   * Pri nalogah tipa vnos z več vrzeli mora biti pravilni_odgovor ločen s podpičjem in presledkom (prva; druga).
3. **Razlage in tipične napake:**
   * Polje slovnicna_razlaga mora jasno pojasniti zakaj je odgovor pravilen.
   * Polje tipicna_napaka mora opozoriti na specifično napako.
4. **UTF-8 kodiranje:** Datoteka naloge.json mora biti vedno shranjena v kodiranju UTF-8 brez BOM.

---

## 3. Pravilo za razlage in tipične napake nalog ravni B2 (Pedagoška preprostost)
* **Jedrnato in razumljivo:** Razlage za naloge ravni B2 morajo biti **kratke, jasne in v vsakdanji slovenščini** (1–2 kratka stavka).
* **Brez težkega jezikoslovja:** Izogibati se je treba kopičenju zapletenih terminov (kot so *tožilniško jedro*, *rodilniško dopolnilo glagolnika* ipd.).
* **Preproste tipične napake (`tipicna_napaka`):** Opozorila na tipične napake ne smejo biti akademska ali preveč zapletena. Pojasniti morajo jedro napake v preprostem jeziku, da jih učenec takoj razume in se jim izogne.
* **Praktični zgled:** Vsaka razlada naj vključuje kratek, vsakdanji zgled pravilne rabe.
* **Naraven in domač jezik:** Razlage in opozorila na napake (`tipicna_napaka`) morajo zveneti domače, kot bi učitelju razlagali v sproščenem pogovoru. Brez mešanja suhoparnih šolskih definicij, ki begajo učenca.
* **Brez nepotrebnega ponavljanja:** Če je poanta jasna iz samega odgovora, naj razlada ne ponavlja istega stavka na drug način, ampak naj poda samo ključni uvid in praktičen primer.


