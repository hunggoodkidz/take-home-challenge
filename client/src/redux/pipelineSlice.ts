import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PipelineState {
  pipelines: string[];
}

const initialState: PipelineState = {
  pipelines: [],
};

const pipelineSlice = createSlice({
  name: 'pipeline',
  initialState,
  reducers: {
    setPipelines: (state, action: PayloadAction<string[]>) => {
      state.pipelines = action.payload;
    },
    addPipeline: (state, action: PayloadAction<string>) => {
      state.pipelines.push(action.payload);
    },
    removePipeline: (state, action: PayloadAction<string>) => {
      state.pipelines = state.pipelines.filter(pipeline => pipeline !== action.payload);
    },
  },
});

export const { setPipelines, addPipeline, removePipeline } = pipelineSlice.actions;
export default pipelineSlice.reducer;