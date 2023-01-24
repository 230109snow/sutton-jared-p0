Jared Sutton's news aggregator project.

# TO-DO
- ~~put interface for API call info (url, param string) in `api-call` service~~
- ~~implement `getAPI(url, paramstring)` in `api-call` service~~

- (on backburner) ~~**FIGURE OUT TODO IN** `filter.component.ts`. 
    - ie figure out how to store variables and modify them in the filter component (from the display component) which will then interact with the api call service. Then maybe have the api call service send its response directly to the display service to display the stories?~~

- MAYBE: move the validator functions in `display.component.ts` to `filter.component.ts`? see note in `display.component.ts`

- finish setting up `text` form section (need to add `invalid-input-msg-div` and maybe an input validation for content, not just string length?)

- finish setting up input fields for `display.component.html` (next is Entity List. Needs much more work)

- have `world-news/filter` contain a class parameter object `currentFilter`, which updates as a form is filled out
    - this form should validate inputs for: 
        - number (required, `>0`), 
        - offset (`>=0`), 
        - earliest-publish-date (no later than 12am that day), 
        - min-sentiment (in `[-1, 1]`), 
        - max-sentiment (in `(min-sentiment, 1]`)

- make method in `world-news/filter` component that takes parameters from `currentFilter` object, converts them to a param string, and then uses `getAPI(..)` from api-call service to define a method `GetWorldNews()` which returns an `Observable`

- have the `world-news/display` component subscribe to that `Observable`, and then display news story headlines, (possibly also by-line), link to the stories, and some content for each.

- Clean up:
    - Get rid of dashed borders etc.
    -