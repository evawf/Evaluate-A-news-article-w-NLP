import { checkForUrl } from "../src/client/js/urlChecker";

describe("Check URL", () => {
    const demoURL = "http://www.wooden-joy.com"; 
    test("Valid URL", () => {
        expect(checkForUrl(demoURL)).toBeTruthy();
    });
});