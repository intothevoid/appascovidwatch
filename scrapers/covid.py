from requests_html import HTMLSession
import json

BASEURL = "https://covidlive.com.au/report/daily-cases"
SUMMARYURL = "https://covidlive.com.au"
STATES = {
    "sa": "South Australia",
    "wa": "Western Australia",
    "nsw": "New South Wales",
    "vic": "Victoria",
    "tas": "Tasmania",
    "nt": "Northern Territory",
    "act": "Australian Capital Territory",
    "all": "All States",
}


class CovidScraper:
    def get_state_covid_numbers(self, state: str, details: bool = False):
        retval = {}
        state = state or "sa"  # default to sa
        retval["state"] = STATES.get(state)

        try:
            # Start HTML session and begin scraping BASEURL
            session = HTMLSession()
            STATEURL = f"{BASEURL}/{state}"

            resp = session.get(STATEURL)
            meta = {"code": resp.status_code, "reason": resp.reason}
            retval["meta"] = meta

            if resp.status_code != 200:
                return retval

            # Extract numbers
            retval["payload"] = self._get_state_payload(resp)
            return retval

        except Exception as exc:
            retval["exception"] = exc
            return retval

    def _get_state_payload(self, rsp):
        payload = {}
        cases = rsp.html.find("section.DAILY-CASES.STD-3")
        dates = cases[0].find("td.COL1.DATE")
        numbers = cases[0].find("td.COL2.NEW")
        zipped = zip(dates, numbers)

        for item in zipped:
            payload[item[0].text] = item[1].text

        return payload

    def get_state_summary(self, state: str):
        retval = {}

        state = state or "sa"  # default to sa
        retval["state"] = STATES.get(state)

        try:
            # Start HTML session and begin scraping BASEURL
            session = HTMLSession()
            STATEURL = f"{SUMMARYURL}/{state}"

            resp = session.get(STATEURL)
            meta = {"code": resp.status_code, "reason": resp.reason}
            retval["meta"] = meta

            if resp.status_code != 200:
                return retval

            # Extract numbers
            retval["payload"] = self._get_state_summary(resp)
            return retval

        except Exception as exc:
            retval["exception"] = exc
            return retval

    def _get_state_summary(self, rsp):
        summary = {}

        summary_table = rsp.html.find("table.DAILY-SUMMARY")
        cat_col = summary_table[0].find("td.COL1.CATEGORY")
        total_col = summary_table[0].find("td.COL2.TOTAL")
        net_col = summary_table[0].find("td.COL4.NET")
        data = zip(cat_col, total_col, net_col)

        for item in data:
            category = item[0].text  # Category
            total_cnt = item[1].text  # Total
            new_cnt = item[2].text  # New
            summary[category] = {total_cnt: new_cnt}

        return summary


if __name__ == "__main__":
    scraper = CovidScraper()
    print(scraper.get_state_summary("sa"))
    print(scraper.get_state_covid_numbers("sa"))
