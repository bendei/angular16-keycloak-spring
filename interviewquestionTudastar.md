
property szintaxis: class és enum = jellel, interface es type : tal


"this" in js
https://www.freecodecamp.org/news/the-this-keyword-in-javascript/
1. Obejtumban magára az objektum példányára mutat
2. Class példányban magára a class példányra mutat
3. Ha a component class on kivul (lambda / function) -> undefined
4. Componenten belul (lambda/function) -> component instance, with all its members accessable
5. 

_this_ in lambda Fukntionen referenziert auf das aussere Context:
1. wenn in einem Component:
   let mymethod = (): void => {
    console.log('ezezezeze: ' + this.); // this referenziert auf das Component
   }

2. nicht in dem component selbst aber in dem gleichen ts file: undefined

3. in einem js file _> Window object

3. in einem ts file: 

const user: UserInterface = {
  id: '1',
  getMessage: () => {
    return user.id;   // referenziert auf das aussere Context:
    return this.age // ez is működik
  }

  getMessage: function() {
  return this.id;  // ha a this-t egy objektumon belül használjuk, akkor az objektumra mutat és elérhetjük vele azpropertiket és a metódusait
};
 
// ha standalone functionban hivjuk meg akkor a window objektumra mutat: 
  function test() {
    console.log('this in a function', this);
  }
.................................................................................................................................................................................................................
any vs unknown
let ez: any = 10; // typescript is disabled it will not check anything, type can be: primitives, objects, methods  ..anything
let az: unknown = 10  // we must specifiy later in the code the datatype, like: let s2: string = ez as string;Problem mit any: man kann einen Property verwenden , als ob es einen property oder Method haette
wobei es hat zB keine -> compiler prüft nichts.
.................................................................................................................................................................................................................
Generics: zum Schreiben wiederverwendbarer Code
1.  Generische Typen: Generics beim Variablen:
  Wir können das folgende array definireren:
let arr: Array<string> = ['z']; // hier wir deklarieren das arr ein Variable von dem gereischen Array type ist. Im eckigen Klammer, wir definieren welche type von Daten wir speichern wollen.

2.  Generics bei Funktionen: wir sollen in der Funktion Definition den parameter type nicht hardkodieren, sondern können es dynamisch den Type beim AUfrufen der Funktion definieren:
    Wir können Funktionen schreiben die mit verschiedenen Typen arbeiten können, anstelle von einem hardkodierten. 
-  DRY: dont repeat yourself: eine Methode, wir sollen keine separate Funktionen für verschidene types schreiben.
- Type-safety: compile time check: input und output der Methode ist das gleiche type.

  


.................................................................................................................................................................................................................
JS map: es ist ein Array method, es transformiert alle Elemente eines Arrays in ein Array von verschiedenen elemente als ein Resultat eines callback Methode
  . Das originale Array bleibt unverändert.
RxJS map: es transformiert die Elemente eines Observable in ein Observable von verschiedenen Elementen als ein Resultat eines callback Methode
  . Das originale Observable bleibt unverändert.


const myMethod = (users: Observable<UserInterface[]>): Observable<string[]> => {
  return users.pipe(map((users) => users.map(((user) => user.name))));
};

const user: UserInterface = {
id: '1',
name: 'John',
age: 12,
getMessage: () => "wwwww"

    };

    const DATA = [ {
      id: '1',
      name: 'John',
      age: 12,
      getMessage: () => "wwwww"
    },
      {
        id: '2',
        name: 'Bende',
        age: 22,
        getMessage: () => "wwwww"

      }
    ];

    const myMethod = (users: Observable<UserInterface[]>): Observable<string[]> => {
      return users.pipe(map((users) => users.map(((user) => user.name))));
    };
    myMethod(of(DATA)).subscribe((data) => console.log(data));  // az of egy next ciklus alatt emittálja az egesz arrat egyben: ezert mappeljük extrán rxjssel

    const myMethodForArray = (users: Observable<UserInterface>): Observable<string> => {
      return users.pipe(map((user) => user.name));
    };
    myMethodForArray(from(DATA)).subscribe((data) => console.log("next called: " + data)); // from operator minden egyes array elemre emittál egy next ciklust
-----
Ha az Observable egy next alatt az egesz array-t emittálja nekünk:
of(DATA).pipe(
  map((users) => users.filter(item => item.age>10)))  // az array elemeit mappeljuk a filter által visszaadott elemekre
.subscribe((val) => console.log(val));
----
azin neveket adjuk vissza, ahol az age > 10:
const users$ = of(DATA);
  const mapperMethod = (users: Observable<UserInterface[]>): Observable<string[]> => {
  return users.pipe(
  map(users =>
  users.filter(user => user.age > 10).map(userObj => userObj.name))
)

.................................................................................................................................................................................................................
// ez object type chcking nem működik, mert a type csak a compile time-ban működik, de a runtime-ban nem

type State = SuccessState | FailedState;
  const getState = (state: State):string => {
    if (state instanceof SuccessState) {  // ez nem műx, mert runtime nincs ilyen type
    ...
ehelyett: 
  if ((state as SuccessState).state === StateEnum.SUCCESS) {
    return StateEnum.SUCCESS;
  }
.................................................................................................................................................................................................................
never keyword: alle Methoden werden beendet, eine Ausnahme ist, wenn wir eine Methode haben, die nie beendet wird, zB: throw new Error('error');
In diesem einzigen Fall können wir den never als return type verwenden.



.................................................................................................................................................................................................................
