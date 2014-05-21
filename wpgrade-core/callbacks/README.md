
Guidelines
==========

 * categorize callbacks though folders; ideally you should be able to deduce
   a little bit of the relationship between callbacks from the structure

 * each file should have around 2-3 functions at most and be no longer then
   around 100 lines give or take; anything more just isn't readable and is
   extremely annoying and hard to navigate though

 * keep the main entry-point (the callback and initial wordpress hook linking)
   in hooks.php or originating file; the callbacks directory should only be
   used to reduce complexity and store away all the fluff

 * all scripts should be in a directory and the first directory should hint of
   the main invocation point
