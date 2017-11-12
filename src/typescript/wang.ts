
%% @since Version 835

ms_wang() ->

    [ {r,y,g,b}, {g,b,g,b}, {r,y,r,y}, {g,b,r,y}, {r,b,g,y}, {g,y,g,y}, {r,b,r,b}, {g,y,r,b} ].





%% @since Version 835

wang_row(Width) ->

    wang_row(Width, top_row, 1, '_', []).





%% @since Version 835

wang_row(Width, PriorRow) ->

    wang_row(Width, PriorRow, 1, '_', []).





%% @since Version 835

wang_row(0, top_row, _At, _Prev, Work) ->

    list_to_tuple(lists:reverse(Work));





wang_row(Remaining, top_row, At, Prev, Work) ->

    N = wang_such_that(case Prev of '_' -> '_'; {_,R,_,_} -> R end, '_'),

    wang_row(Remaining-1, top_row, At+1, N, [N] ++ Work);





wang_row(0, _OldTopRow, _At, _Prev, Work) ->

    list_to_tuple(lists:reverse(Work));





wang_row(Remaining, OldTopRow, At, Prev, Work) ->

    T = element(At, OldTopRow),
    N = wang_such_that(case Prev of '_' -> '_'; {_,R,_,_} -> R end, case T of '_' -> '_'; {_,_,B,_} -> B end),

    wang_row(Remaining-1, OldTopRow, At+1, N, [N] ++ Work).





%% @since Version 835

wang_such_that(Left, Top) ->

    wang_such_that(Left, Top, ms_wang()).





%% @since Version 835

wang_such_that('_', '_', Tiles) ->

    sc:random_from(Tiles);





wang_such_that('_', Top, Tiles) ->

    sc:random_from([ Satisfied || { T,_R,_B,_L}=Satisfied <- Tiles, T =:= Top  ]);





wang_such_that(Left, '_', Tiles) ->

    sc:random_from([ Satisfied || {_T,_R,_B, L}=Satisfied <- Tiles, L =:= Left  ]);





wang_such_that(Left, Top, Tiles) ->

    sc:random_from([ Satisfied || { T,_R,_B, L}=Satisfied <- Tiles, T =:= Top, L =:= Left  ]).





%% @since Version 835

-spec wang_carpet( integer(), integer() ) -> { { integer() } }.

wang_carpet(X, Y) ->

    wang_carpet(X,Y, []).





%% @since Version 835

wang_carpet(X, Y, Tiles) ->

    wang_carpet(X, Y, Tiles, top_row, []).





const wang_carpet = (_Width, 0, _Tiles, _LastRow, Work) =>

    Work.reverse();





const wang_carpet = (Width, RowsLeft, Tiles, LastRow, Work) => {

    const NewRow = wang_row(Width, LastRow),
    return wang_carpet(Width, RowsLeft-1, Tiles, NewRow, [NewRow] ++ Work);  // todo

}