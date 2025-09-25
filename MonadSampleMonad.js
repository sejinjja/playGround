let Functor = function (value) {
  return {
    _value: value,
    map: function (fn) {
      // 매번 값을 함수에 적용하고 다시 상자에 감싸자!!!
      return Functor(fn(this._value));
    },
  };
};
Functor.isFunctor = (functor) =>
  typeof functor === "object" && "_value" in functor;
let unwrap = (functor) =>
  Functor.isFunctor(functor) ? functor._value : functor;

const 을 = (x) => x + "을";
const 는 = (x) => x + "는";
const 귀엽습니다 = (x) => x + " 귀엽습니다";
const 먹습니다 = (x) => x + " 먹습니다";

// 세상이 과대포장이 많아졋습니다....
// 그래도 고양이는 귀엽지 않나요?
let 치즈냥상자 = Functor("치즈냥");
let 고양이상자 = Functor(치즈냥상자);

const functor = Functor(고양이상자).map(는).map(귀엽습니다);

// 얼라??? 고양이상자가 갑자기 없어졌습니다...
unwrap(functor);
// Functor.map에 문제가 생겼습니다... 상자안에 있는 것을 건드리고 싶은데 만질수가 없습니다.

const Monad = function (value) {
  return {
    _value: value,
    map: function (fn) {
      return Monad(fn(this._value));
    },
    // 상자를 모두 열어 재끼고!!! 내용물을 만지자!
    flatMap: function (fn) {
      let value = unwrap(this)
      while (Monad.isMonad((value = unwrap(value)))) {
        // 일단 무조건 상자를 해체하자!
      }
      return Monad(fn(value));
    },
  };
};
Monad.isMonad = (monad) => typeof monad === "object" && "_value" in monad;
unwrap = (monad) => (Monad.isMonad(monad) ? monad._value : monad);

치즈냥상자 = Monad("치즈냥");
고양이상자 = Monad(치즈냥상자);

const monad = Monad(고양이상자).flatMap(는).flatMap(귀엽습니다);
// 이제 상자에서 고양이를 꺼낼 수 있습니다. :)
unwrap(monad);
