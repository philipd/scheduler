import { useState } from 'react';

export default function useApplicationData(initial) {

  return {
    state,
    setDat,
    bookInterview,
    cancelInterview
  }
}