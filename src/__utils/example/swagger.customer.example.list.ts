export const SWAGGER_CUSTOMER_BODY_EXAMPLE = {
  name: "ТзОВ 'Рога та копита' ",
  phone: "050-12-99-458",
  email: "corporative@email.com",
  isDeleted: false,
};

export const SWAGGER_CUSTOMER_EXAMPLE = {
  id: 1,
  ...SWAGGER_CUSTOMER_BODY_EXAMPLE,
};

export const SWAGGER_CUSTOMER_LIST_EXAMPLE = [
  SWAGGER_CUSTOMER_EXAMPLE,
  SWAGGER_CUSTOMER_EXAMPLE,
];
