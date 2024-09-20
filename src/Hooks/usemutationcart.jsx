import React from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";

function Usemutationcart(fn) {
  const queryClient = useQueryClient()
  return  useMutation({mutationFn:fn , onSuccess:()=>{
      queryClient.invalidateQueries({ queryKey: ['getcartApi'] })
    }})
}

export default Usemutationcart;