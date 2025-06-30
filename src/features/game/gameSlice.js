import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../services/firebase';
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

const initialState = {
  gameId: null,
  currentGame: null,
  playerNation: null,  // Added for nation selection
  status: 'idle',
  error: null
};

// Async thunk for creating a game
export const createGame = createAsyncThunk('game/createGame', 
  async ({ gameName, config }, { rejectWithValue }) => {
    try {
      const gameId = Math.random().toString(36).substring(2, 8);
      const gameRef = doc(db, 'games', gameId);
      
      await setDoc(gameRef, {
        name: gameName,
        id: gameId,
        config: {
          totalYears: config.totalYears,
          maxPlayers: config.maxPlayers,
          currentYear: 1,
        },
        status: 'waiting',
        createdAt: new Date().toISOString(),
        players: [],
        takenNations: []
      });
      
      return gameId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
});

// Async thunk for fetching game data
export const fetchGameData = createAsyncThunk(
  'game/fetchGameData',
  async (gameId, { rejectWithValue }) => {
    try {
      const gameRef = doc(db, 'games', gameId);
      const gameSnap = await getDoc(gameRef);
      
      if (gameSnap.exists()) {
        return { id: gameSnap.id, ...gameSnap.data() };
      }
      return rejectWithValue('Game not found');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for joining a game
export const joinGame = createAsyncThunk(
  'game/joinGame',
  async (gameId, { rejectWithValue }) => {
    try {
      const gameRef = doc(db, 'games', gameId);
      const gameSnap = await getDoc(gameRef);
      
      if (gameSnap.exists()) {
        return gameId;
      }
      return rejectWithValue('Game not found');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for selecting a nation
export const selectNation = createAsyncThunk(
  'game/selectNation',
  async ({ gameId, nation, userId, isHost }, { rejectWithValue }) => {
    try {
      const gameRef = doc(db, 'games', gameId);
      
      await updateDoc(gameRef, {
        players: arrayUnion({
          userId,
          nationId: nation.id,
          nationName: nation.name,
          isHost,
          ready: false
        }),
        takenNations: arrayUnion(nation.id)
      });
      
      return nation;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameId: (state, action) => {
      state.gameId = action.payload;
    },
    setGameStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setPlayerNation: (state, action) => {
      state.playerNation = action.payload;
    },
    resetGameState: (state) => {
      Object.assign(state, initialState);
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Game
      .addCase(createGame.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createGame.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.gameId = action.payload;
      })
      .addCase(createGame.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Fetch Game
      .addCase(fetchGameData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGameData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentGame = action.payload;
      })
      .addCase(fetchGameData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Join Game
      .addCase(joinGame.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(joinGame.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.gameId = action.payload;
      })
      .addCase(joinGame.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Select Nation
      .addCase(selectNation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(selectNation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.playerNation = action.payload;
      })
      .addCase(selectNation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { 
  setGameId, 
  setGameStatus, 
  setError, 
  setPlayerNation,
  resetGameState
} = gameSlice.actions;

export default gameSlice.reducer;