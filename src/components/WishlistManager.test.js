import {parseDate, sortingByCriteria} from "./WishlistManager";

describe("parseDate", () => {

    it("returns null for null input", () => {
        const result = parseDate(null);
        expect(result).toBeNull();
    });

    it("parses valid date string", () => {
        const dateString = "2022-05-25";
        const result = parseDate(dateString);
        expect(result instanceof Date).toBe(true);
        expect(result.toISOString().split('T')[0]).toBe(dateString);

    });

    it("parses valid date string with day 1", () => {
        const dateString = "2022-05-01";
        const result = parseDate(dateString);
        expect(result instanceof Date).toBe(true);
        expect(result.toISOString().split('T')[0]).toBe(dateString);
    });

    it("parses valid date string with day 1 and month 1", () => {
        const dateString = "2022-01-01";
        const result = parseDate(dateString);
        expect(result instanceof Date).toBe(true);
        expect(result.toISOString().split('T')[0]).toBe(dateString);
    });

    it("handles invalid month in input string", () => {
        const dateString = "2022-05"; // Invalid month
        const result = parseDate(dateString);
        expect(result instanceof Date).toBe(true);
        expect(result.toISOString().split('T')[0]).toBe("2022-05-31");
    });

    it("handles invalid day in input string", () => {
        const dateString = "2022"; // Invalid day
        const result = parseDate(dateString);
        expect(result instanceof Date).toBe(true);
        expect(result.toISOString().split('T')[0]).toBe("2022-12-31");
    });
});

describe("Sorting Items", () => {
    const data = {
        "items": [
            {
                "id": "uuid6",
                "categories": ["videogames", "shooter"],
                "name": "Warhammer 40.000 : Space Marine 2",
                "picture": "https://cdn.cloudflare.steamstatic.com/steam/apps/2183900/capsule_616x353.jpg?t=1670592538",
                "owned": false,
                "releaseDate": "2023",
                "addedDate": "2023-04-16"
            },
            {
                "id": "uuid7",
                "categories": ["videogames", "rpg"],
                "name": "Dragon Age 4 : Dreadwolf",
                "picture": "https://cdn-uploads.gameblog.fr/img/news/401926_6298f83e37fd9.jpg?ver=1",
                "owned": false,
                "addedDate": "2023-04-16"
            },
            {
                "id": "uuid1",
                "categories": ["videogames"],
                "name": "Diablo 4",
                "picture": "uuid1.png",
                "releaseDate": "2023-06-06",
                "addedDate": "2023-04-12"
            },
            {
                "id": "uuid2",
                "categories": ["BDs"],
                "name": "Elfe #10",
                "picture": "uuid2.png",
                "releaseDate": "2015-03-25",
                "addedDate": "2023-04-13"
            },
            {
                "id": "uuid3",
                "categories": ["BDs"],
                "name": "Elfe #1",
                "picture": "https://www.bedetheque.com/media/Couvertures/Couv_182486.jpg",
                "owned": true,
                "releaseDate": "2013-02-26",
                "addedDate": "2023-04-12"
            },
            {
                "id": "uuid4",
                "categories": ["videogames", "Rpg"],
                "name": "Baldur's Gate 3",
                "picture": "https://m.media-amazon.com/images/M/MV5BMDFlY2MwZGQtZTVjYS00OTM2LWJjYWUtNGY1NjBhZGM0ZTljXkEyXkFqcGdeQXVyMTI0MzA4NTgw._V1_FMjpg_UX1000_.jpg",
                "releaseDate": "2023-08-31",
                "addedDate": "2023-04-13"
            },
            {
                "id": "uuid5",
                "categories": ["videogames"],
                "name": "GTA 5",
                "picture": "https://image.jeuxvideo.com/medias-sm/163129/1631287693-8700-jaquette-avant.jpg",
                "owned": true,
                "releaseDate": "2013-09-17",
                "addedDate": "2023-04-14"
            }
        ]
    }


    it("sorts items by release date", () => {
        data.items.sort(sortingByCriteria("releaseDate", "Date", false));
        expect(data.items.map(item => item.releaseDate)).toStrictEqual(
            ["2013-02-26",
                "2013-09-17",
                "2015-03-25",
                "2023-06-06",
                "2023-08-31",
                "2023",
                undefined]);
    });

    it("sorts items by release date reversed", () => {
        data.items.sort(sortingByCriteria("releaseDate", "Date", true));
        expect(data.items.map(item => item.releaseDate)).toStrictEqual(
            [undefined,
                "2023",
                "2023-08-31",
                "2023-06-06",
                "2015-03-25",
                "2013-09-17",
                "2013-02-26"]);
    });

    it("sorts items by added date", () => {
        data.items.sort(sortingByCriteria("addedDate", "Date", false));
        expect(data.items.map(item => item.addedDate)).toStrictEqual(
            [
                "2023-04-12",
                "2023-04-12",
                "2023-04-13",
                "2023-04-13",
                "2023-04-14",
                "2023-04-16",
                "2023-04-16",
            ]);
    });

    it("sorts items by added date reversed", () => {
        data.items.sort(sortingByCriteria("addedDate", "Date", true));
        expect(data.items.map(item => item.addedDate)).toStrictEqual(
            [
                "2023-04-16",
                "2023-04-16",
                "2023-04-14",
                "2023-04-13",
                "2023-04-13",
                "2023-04-12",
                "2023-04-12",
            ]);
    });

    it("sorts items by name", () => {
        data.items.sort(sortingByCriteria("name", undefined, false));
        expect(data.items.map(item => item.name)).toStrictEqual(
            [
                "Baldur's Gate 3",
                "Diablo 4",
                "Dragon Age 4 : Dreadwolf",
                "Elfe #1",
                "Elfe #10",
                "GTA 5",
                "Warhammer 40.000 : Space Marine 2"
            ]);
    });

    it("sorts items by name reversed", () => {
        data.items.sort(sortingByCriteria("name", undefined, true));
        expect(data.items.map(item => item.name)).toStrictEqual(
            [
                "Warhammer 40.000 : Space Marine 2",
                "GTA 5",
                "Elfe #10",
                "Elfe #1",
                "Dragon Age 4 : Dreadwolf",
                "Diablo 4",
                "Baldur's Gate 3"
            ]);
    });
});