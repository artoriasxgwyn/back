import sum from "../function.js";
//npm init jest@latest esto creara un archivo de configuracion para jest con unas cuantas preguntas
//const sum = require("./function.js")

test("sumar 2 numeros", () => {
    expect(sum(1, 2)).toBe(3)
})
test('data del objeto', () => {
    const data = { one: 1 };
    data['two'] = 1;
    console.log(data)
    expect(data/*valor que produce el codigo*/).not.toEqual({ one: 1, two: 2 }/*valor correcto*/);
    //al negar la condicion para que pase la prueba los datos deben ser diferentes a los esperados
});
test("null", () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
})
test('do mas do', () => {
  const value = 2 + 2.5;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  //expect(value).toBeLessThan(3);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  //expect(value).toBe(4);
  //expect(value).toEqual(4);
});
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
  //toMatch revisa que esa cadena de strings este en el valor a probar
});
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'milk',
];

test('the shopping list has milk on it', () => {
  expect(shoppingList).toContain('milk');
  expect(new Set(shoppingList)).toContain('milk');
  //este revisa contenidos y no direcciones de memoria
});

function compileAndroidCode() {
  throw new Error('you are using the wrong JDK!');
}

test('compiling android goes as expected', () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);

  //you can also use a string that must be contained in the error message or a regexp
  expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
  expect(() => compileAndroidCode()).toThrow(/JDK/);

  //or you can match an exact error message using a regexp like below
  //expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK$/); // Test fails
  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/); // Test pass
});