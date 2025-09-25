const pipe = (...fns) => {
  return (x) => {
    for (const fn of fns) x = fn(x);
    return x;
  };
};

const go = (x, ...fns) => pipe(...fns)(x);
const Box = (value) => ({ value });
Box.isBox = (box) => typeof box === "object" && "value" in box;

let 을 = (x) => (Box.isBox(x) ? x.value : x) + "을";
let 먹습니다 = (x) => x + " 먹습니다";

// 이제 밥은 그만 먹고, 산책중에 고양이를 봤습니다
let 는 = (x) => (Box.isBox(x) ? x.value : x) + "는";
let 귀엽습니다 = (x) => x + " 귀엽습니다";
go("고양이", 는, 귀엽습니다);

const 고양이상자 = Box(["치즈냥", "삼색냥"]);
go(고양이상자, 는, 귀엽습니다);
//              (Box.isBox(x) ? x.value : x) <------- 그런데 이거 뭔가 매번써야하는데, 다른방법은 없나요?

// 또 다른 상자를 만들어 봅시다. 이번에는 자동으로 상자로 감쌀 수 있는 기능이 있으면 좋을 것 같습니다.
// 이번에는 상자의 값의 map 을 이용하여 함수를 적용 할 수 있게 됩니다.
const Functor = function (value) {
  return {
    _value: value,
    map: function (fn) {
      // 매번 값을 함수에 적용하고 다시 상자에 감싸자!!!
      return Functor(fn(this._value));
    },
  };
};

// (Box.isBox(x) ? x.value : x) 귀찮은 코드를 모두 제거합시다.
을 = (x) => x + "을";
는 = (x) => x + "는";

// 이제는 go | pipe 없이도....
// -----------------> 읽히네요!
Functor("고양이").map(는).map(귀엽습니다);
Functor(["치즈냥", "삼색냥"]).map(는).map(귀엽습니다);
// 그런데요.... 아직도 박스에 있네요... 고양이들 좀 꺼내고 싶은데요...

Functor.isFunctor = (functor) => typeof functor === "object" && "_value" in functor;
// 마지막에 상자를 직접 열어 보면 어떨까요?
const unwrap = (functor) => Functor.isFunctor(functor) ? functor._value : functor;
const functor = Functor(["치즈냥", "삼색냥"]).map(는).map(귀엽습니다);

// 이제 고양이들을 꺼낼 수 있습니다!
unwrap(functor);
