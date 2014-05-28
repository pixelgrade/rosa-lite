Partials are all invoked in the context of a function and you have access to
any variables in the scope of that function. Doc comments on relevant variables
have been placed (the syntax will trigger autocomplete if applicable).

Partials are considered as part of the theme and not a shared system asset, so
they may be customized accordingly by placing them in your theme-partials under
the overwrites directory defined in your configuration by
"core-partials-overwrite-path" (default: theme-partials/wpgrade-partials) but
must maintain the same file name. If not available the core version will be
used.
