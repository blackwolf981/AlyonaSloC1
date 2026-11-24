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
