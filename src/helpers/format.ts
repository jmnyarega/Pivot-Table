export const formatNumber = (value: number): string => {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "0";
  } else {
    return new Intl.NumberFormat("en-IN", {
      maximumSignificantDigits: 3,
    }).format(Math.ceil(value));
  }
};

export const formatCamelCaseHeaders = (value: string): string => {
  let re = /^[a-z]+([A-Z][a-z\d]+)+/;
  let result = "";
  if (re.test(value)) {
    // find position of the the uppercase letter
    let re = /[A-Z]/;

    const res = re.exec(value);
    result += value.slice(0, res?.index);
    result += "-";
    result += value.slice(res?.index);
  } else {
    result = value;
  }
  return result;
};
