Jared Sutton's news aggregator project.

# TODO
- put interface for API call info (url, param string) in `api-call` service
- implement `getAPI(url, paramstring)` in `api-call` service
- have `world-news/filter` contain a class parameter object `currentFilter`, which updates as a form is filled out
    - this form should validate inputs for: 
        - number (required, `>0`), 
        - offset (`>=0`), 
        - earliest-publish-date (no later than 12am that day), 
        - min-sentiment (in `[-1, 1]`), 
        - max-sentiment (in `(min-sentiment, 1]`)
- make method in `world-news/filter` component that takes parameters from `currentFilter` object, converts them to a param string, and then uses `getAPI(..)` from api-call service to define a method `GetWorldNews()` which returns an `Observable`
- have the `world-news/display` component subscribe to that `Observable`, and then display news story headlines, (possibly also by-line), link to the stories, and some content for each.
