export default (direction) => {
  switch (true) {
    case direction >= 12 && direction <= 33:
      return "North-Northeast";
    case direction >= 34 && direction <= 56:
      return "Northeast";
    case direction >= 57 && direction <= 78:
      return "East-Northeast";
    case direction >= 79 && direction <= 101:
      return "East";
    case direction >= 102 && direction <= 123:
      return "East-Southeast";
    case direction >= 124 && direction <= 146:
      return "Southeast";
    case direction >= 147 && direction <= 168:
      return "South-Southeast";
    case direction >= 169 && direction <= 191:
      return "South";
    case direction >= 192 && direction <= 213:
      return "South-Southwest";
    case direction >= 214 && direction <= 236:
      return "Southwest";
    case direction >= 237 && direction <= 258:
      return "West-Southwest";
    case direction >= 259 && direction <= 281:
      return "West";
    case direction >= 282 && direction <= 303:
      return "West-Northwest";
    case direction >= 304 && direction <= 326:
      return "Northwest";
    case direction >= 327 && direction <= 348:
      return "North-Northwest";
    case (direction >= 349 && direction <= 361) ||
      (direction >= 0 && direction <= 11):
      return "North";
  }
};
