from requests_html import HTMLSession
import json

BASEURL = "https://covidlive.com.au/report/daily-cases"
SUMMARYURL = "https://covidlive.com.au"
WORLDSUMMARYURL = "https://covidlive.com.au/world"

STATES = {
    "sa": "South Australia",
    "wa": "Western Australia",
    "nsw": "New South Wales",
    "vic": "Victoria",
    "tas": "Tasmania",
    "nt": "Northern Territory",
    "act": "Australian Capital Territory",
    "all": "Australia",
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

        state = state or "all"  # default to all
        retval["state"] = STATES.get(state)
        STATEURL = SUMMARYURL  # default to all

        try:
            # Start HTML session and begin scraping BASEURL
            session = HTMLSession()

            if state != "all":  # specific state requested
                STATEURL = f"{SUMMARYURL}/{state}"

            resp = session.get(STATEURL)
            meta = {"code": resp.status_code, "reason": resp.reason}
            retval["meta"] = meta

            if resp.status_code != 200:
                return retval

            # Extract numbers
            if state != "all":
                # specific state requested
                retval["payload"] = self._get_state_summary(resp)
            else:
                # all states summary requested
                retval["payload"] = self._get_all_states_summary(resp)
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

    def _get_all_states_summary(self, rsp):
        summary = {}

        summary_table = rsp.html.find("table.CASES")
        state_col = summary_table[0].find("td.COL1.STATE")
        total_col = summary_table[0].find("td.COL2.CASES")
        net_col = summary_table[0].find("td.COL4.NET")
        data = zip(state_col, total_col, net_col)

        for item in data:
            state = item[0].text  # Category
            total_cnt = item[1].text  # Total
            new_cnt = item[2].text  # New
            summary[state] = {total_cnt: new_cnt}

        return summary

    def get_worldwide_summary(self):
        retval = {}

        try:
            # Start HTML session and begin scraping BASEURL
            session = HTMLSession()

            resp = session.get(WORLDSUMMARYURL)
            meta = {"code": resp.status_code, "reason": resp.reason}
            retval["meta"] = meta

            if resp.status_code != 200:
                return retval

            # Get worldwide case numbers and deaths
            payload = {}
            payload["summary"] = self._get_worldwide_cases_summary(resp)
            payload["deaths"] = self._get_worldwide_deaths_summary(resp)
            retval["payload"] = payload

            return retval

        except Exception as exc:
            retval["exception"] = exc
            return retval

    def _get_worldwide_cases_summary(self, rsp):
        summary = {}

        summary_table = rsp.html.find("table.CASES-WORLDWIDE")
        country_col = summary_table[0].find("td.COL1.COUNTRY")
        total_col = summary_table[0].find("td.COL2.CASES")
        net_col = summary_table[0].find("td.COL4.NET")
        data = zip(country_col, total_col, net_col)

        for item in data:
            country = item[0].text  # Category
            total_cnt = item[1].text  # Total
            new_cnt = item[2].text  # New
            summary[country] = {total_cnt: new_cnt}

        return summary

    def _get_worldwide_deaths_summary(self, rsp):
        summary = {}

        summary_table = rsp.html.find("table.DEATHS-WORLDWIDE")
        country_col = summary_table[0].find("td.COL1.COUNTRY")
        deaths_col = summary_table[0].find("td.COL2.DEATHS")
        net_col = summary_table[0].find("td.COL4.NET")
        data = zip(country_col, deaths_col, net_col)

        for item in data:
            country = item[0].text  # Category
            deaths_cnt = item[1].text  # Total
            new_cnt = item[2].text  # New
            summary[country] = {deaths_cnt: new_cnt}

        return summary


if __name__ == "__main__":
    scraper = CovidScraper()
    print(scraper.get_worldwide_summary())
    print(scraper.get_state_summary("sa"))
    print(scraper.get_state_summary("all"))
    print(scraper.get_state_covid_numbers("sa"))
