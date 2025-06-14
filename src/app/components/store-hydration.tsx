'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBoards, setCurrentBoard } from '../redux/slices/slices';

export function StoreHydration() {
  const dispatch = useDispatch();

  useEffect(() => {
    const boards = localStorage.getItem("boards")
      ? JSON.parse(localStorage.getItem("boards")!)
      : [];
    
    if (boards.length > 0) {
      dispatch(setBoards(boards));
    }

    const currentBoard = localStorage.getItem("currentBoard")
      ? JSON.parse(localStorage.getItem("currentBoard")!)
      : null;
    
    if (currentBoard) {
      dispatch(setCurrentBoard(currentBoard));
    }
  }, [dispatch]);

  return null;
}
