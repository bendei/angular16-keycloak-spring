
ng add @ngrx/store

jó egyszerű bevezető példa
https://ngrx.io/guide/store

https://dzone.com/articles/angular-app-state-management-with-ngrx

- kérdés: ngrx el menedzseljük a form datat is?
- az inputoutputot át lehetne jol irni reduxra
  Ausgangssituation: Wir haben ein form und ein table Kompoenent, wenn ein neuer Product in den form Kompoenent eingetragen wird, dann wird der neue Produtkt in dem  Tabellenkomponent
  angezeigt.
  Lösung ohne NgRX: beide Komponente haben ein gemeinsames Elternkomponent, wodurch sie miteinander kommunizieren. Wird ein Product eingetragen, dann wird in der form Komp.
  ein custom Erreignis mit dem Product payload ausgelöst (@Output) -> dieser Erreignis wird vom Parent Komponent empfangen und die products array damit aktualisiert. Table component
  (in dem View) enthält ein @Input property products, die im Template angezeigt ist; dieses Property wird mit property binding immer aktualisiert wenn das Product array vom
  parent aktualisiert ist.
  Table kann selected Product (mit Klikk auf der Tabellenreihe) ebenfalls als ein Erreignis-Payload an das Form Kompoenente schicken, worauf - wie oben -durch event binding
  ein Handler Methode aufgerufen wird, um die form Felder zu populieren.

NgRX
Ursprünglich jede Komponente hatte ihren eigenen Zustand und bildete eine abgeschottete Einheit zu den anderen Komponenten. Im NgRX Die Komponenten sollen dazu ihre bisherige Kontrolle
über die Daten und die Koordination der Prozesse an eine zentrale Stelle abgeben. Die Aufgabe der Komponenten ist es dann nur noch, Daten für die Anzeige zu lesen,
neue Daten zu erfassen und Events an die zentrale Stelle zu senden. zentrale Zustandsverwaltung (engl. State Management).

REDUX: ein Architektusmuster;
NgRX, Reactive Extension for Angular: Imlementierung von Redux Muster; Anwendunszustand verwalten und Prozesse verwalten.

Der zentrale Bestandteil der Architektur ist ein Store, in dem der gesamte Anwendungszustand als eine einzige große verschachtelte Datenstruktur hinterlegt ist Der Store ist
die Single Source of Truth für die Anwendung und enthält alle Zustände: vom Server heruntergeladene Daten, gesetzte Einstellungen, die aktuell geladene Route oder Infos
zum angemeldeten Nutzer – alles, was sich zur Laufzeit in der Anwendung verändert und den Zustand beschreibt.

Store: enthält die application state / Zustand
Action: Erreignis, ausgelöst in dem Kompoenent / service, das den Applicationszustand mit seinem Payload ändert. Ein Acion ist zB addCustomer, deleteCustomer, getAllCustomers
Reducer: alle Zustandsänderungen passieren hier, es reagiert auf dem Action und je nach dem Actiontype kreiert ein neues immutablen state und gibt es dem Strore zurück.
Selector: eine Funktion, um bestimmten Teil des State von dem Strore zu erhalten.

Jedes Feature Module soll ein eigenes ngrx feature haben (= mit eigenen Satz an Actions, Reducerns, Effects). Mit ng g feature können wir ngrx für ein bestehendes Feature-Modules
aufsetzen. ng g feature inputOutput/store/inputoutput --module inputOutput/shared/inputOutput --api --defaults

1.	StoreModule soll im AppModule importiert werden und hier konfigurieren wir den DevTool auch:
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument(
    { maxAge: 25, logOnly: environment.production }
    )

2.	NgRX einrichten in dem jeweiligen Feature Module, hier definieren wir die Struktur des globalen State-Objekts:

	StoreModule.forRoot(fromBook.bookFeatureKey (= unter diesen Namen wird die Zustände dieses Feature im globalen State-Objekt festgelegt, fromBook.reducer
	(=dieser Reducer ist verantwortlich für den State-Teil) ); ->
	der globale State-Objekt wird durch forRoot also erweitert und die reducer wird integriert in die Anwendung.

3.	Definieren der inputoutput feature-state für das Feature inputoutpt, als Interface , die festlegt welche Zustänfe und Daten wir speichern wollen.
    Variable initialState.

4.	Action: für die Kommunikation mit dem Store. Es ist ein "nachricht" Objekt mit Properties type und payload. NgRX stellt createAction Funtion zur  Verfügung:
    1 Argument für Name der Action,
    2. Arg: Payload. Ein möglicher Action-Onjekt Aufbau:
    {
    type: '[Inputoutput] Load Inputoutputs Success',
    data: Book[]
    }

5.	Um mit dem Store zu kommunizieren und Zustandsänderungen anzustoßen, müssen die Actions von den Komponenten in den Store gesendet werden. Der Store verfügt über eine Methode
    dispatch(), mit der wir eine Action in den Store dispatchen können. Aktionen werden von kompoenenten ausgelöst.

6.	Mit reducer verändern wir den State, es ist eine Funktion die den aktuellen Zustand und die entreffende Aktion als Arg  bekommt. Es berechnet den neuen Zustand und
    liefert zurück. Für jede Fallunterscheidung existiert ein Block, der in ein on() gekapselt ist.

