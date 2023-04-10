export const SWAGGER_BUILDING_BODY = {
  name: "Операторна кормоцеху",
  address:
    "с.Копанки, Калушського р-ну, Івано-Франківської обл. вул.Довженка 1",
  description: "зліва від офісу 9-ти поверхова споруда",
  coordinate: "48.93609243561525, 24.74695169142123",
  service_contract: "Договір №15 від 20.01.2022",
  firmId: 5,
};

export const SWAGGER_BUILDING = {
  id: 1,
  ...SWAGGER_BUILDING_BODY,
};

export const SWAGGER_BUILDING_FIRM = {
  id: 1,
  ...SWAGGER_BUILDING_BODY,
  client: {},
};

export const SWAGGER_BUILDING_LIST = [SWAGGER_BUILDING, SWAGGER_BUILDING];
