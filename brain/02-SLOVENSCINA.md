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
5. **Tip `stavcni_puzzle` (Sestavi poved, raven B2; v bazi 30 nalog po vnosu 27. 11. 2026):**
   * `kontekst` je prazen niz (`""`), ker bi poved izdala rešitev.
   * `moznosti` so **sestavine** v premešanem vrstnem redu: vsaka sestavina je ena beseda ali eno ločilo, **brez presledkov znotraj sestavine**; 7–9 sestavin.
   * Vse sestavine so med seboj **različni nizi** in natanko **ena** se začne z veliko začetnico (začetek povedi); lastnih imen sredi povedi ne uporabljamo, ker bi naredila rešitev dvoumno.
   * Notranja ločila (vejica, dvopičje, pomišljaj) so samostojne sestavine; končno ločilo (`. ? !`) **ni** sestavina, ampak je samo v `pravilni_odgovor`.
   * `pravilni_odgovor` je natanko združene sestavine v pravilnem vrstnem redu, z enim presledkom med njimi in s končnim ločilom; nobene sestavine ne uporabi dvakrat in ne dodajaj besed, ki jih ni med sestavinami.
   * Rešitev mora biti **enolična**: iz sestavin je mogoče sestaviti samo pravilno poved (in morebitne navedene alternative); preveri tako, da sestavine premešaš in poskusiš sestaviti napačno poved.
   * Če so dopustni različni vrstni redi, so vsi navedeni v `alternativni_odgovori`, razlaga pa pove, kateri del vrstnega reda je vezan (naslonski niz) in kateri prost.

---

## 3. Pravilo za razlage in tipične napake nalog ravni B2 (Pedagoška preprostost)
* **Jedrnato in razumljivo:** Razlage za naloge ravni B2 morajo biti **kratke, jasne in v vsakdanji slovenščini** (1–2 kratka stavka).
* **Brez težkega jezikoslovja:** Izogibati se je treba kopičenju zapletenih terminov (kot so *tožilniško jedro*, *rodilniško dopolnilo glagolnika* ipd.).
* **Preproste tipične napake (`tipicna_napaka`):** Opozorila na tipične napake ne smejo biti akademska ali preveč zapletena. Pojasniti morajo jedro napake v preprostem jeziku, da jih učenec takoj razume in se jim izogne.
* **Praktični zgled:** Vsaka razlada naj vključuje kratek, vsakdanji zgled pravilne rabe.
* **Naraven in domač jezik:** Razlage in opozorila na napake (`tipicna_napaka`) morajo zveneti domače, kot bi učitelju razlagali v sproščenem pogovoru. Brez mešanja suhoparnih šolskih definicij, ki begajo učenca.
* **Brez nepotrebnega ponavljanja:** Če je poanta jasna iz samega odgovora, naj razlada ne ponavlja istega stavka na drug način, ampak naj poda samo ključni uvid in praktičen primer.


