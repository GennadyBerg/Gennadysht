import React, { Component, useState } from 'react';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import { Container, Avatar, Typography, Grid, CardActionArea, Card, CardContent, CardMedia, AvatarGroup, CardActions, Collapse, IconButton, Paper, List, ListItem, Box, Link, TablePagination } from '@mui/material';
//CssBaseline, TextField, FormControlLabel, Checkbox, Link, Divider
import { getFullImageUrl } from "../utills";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Good } from './Good';
import { OrderGood } from './OrderGood';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from "@mui/material";
import { StyledTableCell, StyledTableRow } from './StyledTableElements';
import { visuallyHidden } from '@mui/utils';
import TableSortLabel from '@mui/material/TableSortLabel';

let exampleOrderList = [
    {
        "_id": "62af282db74e1f5f2ec1a0bb",
        "total": 0,
        "createdAt": "1655646253000",
        "owner": {
            "_id": "62af27dbb74e1f5f2ec1a0ba",
            "nick": null
        }
    },
    {
        "_id": "62af33b5b74e1f5f2ec1a0be",
        "total": 33,
        "createdAt": "1655649205000",
        "owner": {
            "_id": "62af332bb74e1f5f2ec1a0bc",
            "nick": null
        }
    },
    {
        "_id": "62cdc9b3b74e1f5f2ec1a0e9",
        "total": 3383,
        "createdAt": "1657653683000",
        "owner": {
            "_id": "62cdc96fb74e1f5f2ec1a0e5",
            "nick": "test345"
        }
    },
    {
        "_id": "62d1473db74e1f5f2ec1a0f4",
        "total": null,
        "createdAt": "1657882429000",
        "owner": {
            "_id": "62d12d53b74e1f5f2ec1a0f2",
            "nick": null
        }
    },
    {
        "_id": "62d15f01b74e1f5f2ec1a0f6",
        "total": null,
        "createdAt": "1657888513000",
        "owner": {
            "_id": "62d12d53b74e1f5f2ec1a0f2",
            "nick": null
        }
    },
    {
        "_id": "62d16aeab74e1f5f2ec1a0f9",
        "total": null,
        "createdAt": "1657891562000",
        "owner": {
            "_id": "62d12d53b74e1f5f2ec1a0f2",
            "nick": null
        }
    },
    {
        "_id": "62d16ef7b74e1f5f2ec1a0fc",
        "total": 200,
        "createdAt": "1657892599000",
        "owner": {
            "_id": "62d12d53b74e1f5f2ec1a0f2",
            "nick": null
        }
    },
    {
        "_id": "62d16f01b74e1f5f2ec1a0fe",
        "total": 300,
        "createdAt": "1657892609000",
        "owner": {
            "_id": "62d12d53b74e1f5f2ec1a0f2",
            "nick": null
        }
    },
    {
        "_id": "62d424b0b74e1f5f2ec1a131",
        "total": 2500,
        "createdAt": "1658070192000",
        "owner": {
            "_id": "62c1c294b74e1f5f2ec1a0c1",
            "nick": null
        }
    },
    {
        "_id": "62d489feb74e1f5f2ec1a136",
        "total": 3000,
        "createdAt": "1658096126000",
        "owner": {
            "_id": "62cc8536b74e1f5f2ec1a0e4",
            "nick": null
        }
    },
    {
        "_id": "62d4a881b74e1f5f2ec1a138",
        "total": 2800,
        "createdAt": "1658103937000",
        "owner": {
            "_id": "62cc8536b74e1f5f2ec1a0e4",
            "nick": null
        }
    },
    {
        "_id": "62d5445ab74e1f5f2ec1a13a",
        "total": 1250,
        "createdAt": "1658143834000",
        "owner": {
            "_id": "62629b99bf8b206433f5b3c7",
            "nick": null
        }
    },
    {
        "_id": "62d54463b74e1f5f2ec1a13c",
        "total": 1250,
        "createdAt": "1658143843000",
        "owner": {
            "_id": "62629b99bf8b206433f5b3c7",
            "nick": null
        }
    },
    {
        "_id": "62d54708b74e1f5f2ec1a13e",
        "total": 1250,
        "createdAt": "1658144520000",
        "owner": {
            "_id": "62c1c294b74e1f5f2ec1a0c1",
            "nick": null
        }
    },
    {
        "_id": "62d547e5b74e1f5f2ec1a140",
        "total": 2500,
        "createdAt": "1658144741000",
        "owner": {
            "_id": "62c1c294b74e1f5f2ec1a0c1",
            "nick": null
        }
    },
    {
        "_id": "62d574c1b74e1f5f2ec1a144",
        "total": 5050,
        "createdAt": "1658156225000",
        "owner": {
            "_id": "62d3df39b74e1f5f2ec1a128",
            "nick": null
        }
    },
    {
        "_id": "62d5753db74e1f5f2ec1a147",
        "total": 3650,
        "createdAt": "1658156349000",
        "owner": {
            "_id": "62d3df39b74e1f5f2ec1a128",
            "nick": null
        }
    },
    {
        "_id": "62d9aa06b74e1f5f2ec1a169",
        "total": 3383,
        "createdAt": "1658432006000",
        "owner": {
            "_id": "62d989f1b74e1f5f2ec1a160",
            "nick": null
        }
    },
    {
        "_id": "62e58d69b74e1f5f2ec1a177",
        "total": 2599,
        "createdAt": "1659211113000",
        "owner": {
            "_id": "62e58d5db74e1f5f2ec1a174",
            "nick": null
        }
    },
    {
        "_id": "62e66a80b74e1f5f2ec1a179",
        "total": 2400,
        "createdAt": "1659267712000",
        "owner": {
            "_id": "62e58d5db74e1f5f2ec1a174",
            "nick": null
        }
    },
    {
        "_id": "62ed84cdb74e1f5f2ec1a193",
        "total": 2100,
        "createdAt": "1659733197000",
        "owner": {
            "_id": "62d98b55b74e1f5f2ec1a162",
            "nick": null
        }
    },
    {
        "_id": "62f132a7b74e1f5f2ec1a198",
        "total": 20800,
        "createdAt": "1659974311000",
        "owner": {
            "_id": "62d98b55b74e1f5f2ec1a162",
            "nick": null
        }
    },
    {
        "_id": "62f3f384b74e1f5f2ec1a19f",
        "total": 300,
        "createdAt": "1660154756000",
        "owner": {
            "_id": "62d98b55b74e1f5f2ec1a162",
            "nick": null
        }
    },
    {
        "_id": "62f4e278b74e1f5f2ec1a1a6",
        "total": 8750,
        "createdAt": "1660215928000",
        "owner": {
            "_id": "62d98b55b74e1f5f2ec1a162",
            "nick": null
        }
    },
    {
        "_id": "62f4e325b74e1f5f2ec1a1a9",
        "total": 13700,
        "createdAt": "1660216101000",
        "owner": {
            "_id": "62d98b55b74e1f5f2ec1a162",
            "nick": null
        }
    },
    {
        "_id": "62f4e3efb74e1f5f2ec1a1ab",
        "total": 1800,
        "createdAt": "1660216303000",
        "owner": {
            "_id": "62d98b55b74e1f5f2ec1a162",
            "nick": null
        }
    },
    {
        "_id": "62f4ed72b74e1f5f2ec1a1ae",
        "total": 4650,
        "createdAt": "1660218738000",
        "owner": {
            "_id": "62d98b55b74e1f5f2ec1a162",
            "nick": null
        }
    },
    {
        "_id": "62f4edadb74e1f5f2ec1a1b1",
        "total": 23600,
        "createdAt": "1660218797000",
        "owner": {
            "_id": "62d98b55b74e1f5f2ec1a162",
            "nick": null
        }
    },
    {
        "_id": "62f4ededb74e1f5f2ec1a1b3",
        "total": 1200,
        "createdAt": "1660218861000",
        "owner": {
            "_id": "62d98b55b74e1f5f2ec1a162",
            "nick": null
        }
    },
    {
        "_id": "62f4eef4b74e1f5f2ec1a1b8",
        "total": 10500,
        "createdAt": "1660219124000",
        "owner": {
            "_id": "62d98b55b74e1f5f2ec1a162",
            "nick": null
        }
    },
    {
        "_id": "62f4eefbb74e1f5f2ec1a1ba",
        "total": 5000,
        "createdAt": "1660219131000",
        "owner": {
            "_id": "62d98b55b74e1f5f2ec1a162",
            "nick": null
        }
    },
    {
        "_id": "62f4f21cb74e1f5f2ec1a1bc",
        "total": 5000,
        "createdAt": "1660219932000",
        "owner": {
            "_id": "62d98b55b74e1f5f2ec1a162",
            "nick": null
        }
    },
    {
        "_id": "62f4f448b74e1f5f2ec1a1be",
        "total": 38500,
        "createdAt": "1660220488000",
        "owner": {
            "_id": "62d98b55b74e1f5f2ec1a162",
            "nick": null
        }
    },
    {
        "_id": "62f4f4a5b74e1f5f2ec1a1c0",
        "total": 2100,
        "createdAt": "1660220581000",
        "owner": {
            "_id": "62d98b55b74e1f5f2ec1a162",
            "nick": null
        }
    },
    {
        "_id": "62f4f83cb74e1f5f2ec1a1c2",
        "total": 900,
        "createdAt": "1660221500000",
        "owner": {
            "_id": "62d98b55b74e1f5f2ec1a162",
            "nick": null
        }
    },
    {
        "_id": "62f4fd5ab74e1f5f2ec1a1c4",
        "total": 900,
        "createdAt": "1660222810000",
        "owner": {
            "_id": "62d98b55b74e1f5f2ec1a162",
            "nick": null
        }
    },
    {
        "_id": "62f4ffd2b74e1f5f2ec1a1c6",
        "total": 900,
        "createdAt": "1660223442000",
        "owner": {
            "_id": "62d98b55b74e1f5f2ec1a162",
            "nick": null
        }
    },
    {
        "_id": "62f502bbb74e1f5f2ec1a1c8",
        "total": 3500,
        "createdAt": "1660224187000",
        "owner": {
            "_id": "62d98b55b74e1f5f2ec1a162",
            "nick": null
        }
    },
    {
        "_id": "62f50455b74e1f5f2ec1a1ca",
        "total": 900,
        "createdAt": "1660224597000",
        "owner": {
            "_id": "62d98b55b74e1f5f2ec1a162",
            "nick": null
        }
    },
    {
        "_id": "62f50485b74e1f5f2ec1a1cc",
        "total": 6250,
        "createdAt": "1660224645000",
        "owner": {
            "_id": "62d98b55b74e1f5f2ec1a162",
            "nick": null
        }
    },
    {
        "_id": "62f504c0b74e1f5f2ec1a1ce",
        "total": 5600,
        "createdAt": "1660224704000",
        "owner": {
            "_id": "62d98b55b74e1f5f2ec1a162",
            "nick": null
        }
    },
    {
        "_id": "62f5050eb74e1f5f2ec1a1d1",
        "total": 900,
        "createdAt": "1660224782000",
        "owner": {
            "_id": "62f504fdb74e1f5f2ec1a1cf",
            "nick": null
        }
    },
    {
        "_id": "62f5051cb74e1f5f2ec1a1d3",
        "total": 1500,
        "createdAt": "1660224796000",
        "owner": {
            "_id": "62d98b55b74e1f5f2ec1a162",
            "nick": null
        }
    },
    {
        "_id": "62f506c0b74e1f5f2ec1a1d5",
        "total": 900,
        "createdAt": "1660225216000",
        "owner": {
            "_id": "62d98b55b74e1f5f2ec1a162",
            "nick": null
        }
    },
    {
        "_id": "62f5099bb74e1f5f2ec1a1d7",
        "total": 300,
        "createdAt": "1660225947000",
        "owner": {
            "_id": "62d98b55b74e1f5f2ec1a162",
            "nick": null
        }
    },
    {
        "_id": "62f509c4b74e1f5f2ec1a1d9",
        "total": 900,
        "createdAt": "1660225988000",
        "owner": {
            "_id": "62d98b55b74e1f5f2ec1a162",
            "nick": null
        }
    },
    {
        "_id": "62f50a0ab74e1f5f2ec1a1db",
        "total": 1250,
        "createdAt": "1660226058000",
        "owner": {
            "_id": "62d98b55b74e1f5f2ec1a162",
            "nick": null
        }
    },
    {
        "_id": "62f52917b74e1f5f2ec1a1dd",
        "total": 600,
        "createdAt": "1660234007000",
        "owner": {
            "_id": "62dbcd9cb74e1f5f2ec1a16e",
            "nick": null
        }
    },
    {
        "_id": "62f8c7e6b74e1f5f2ec1a1e7",
        "total": 4250,
        "createdAt": "1660471270000",
        "owner": {
            "_id": "62629b99bf8b206433f5b3c7",
            "nick": null
        }
    },
    {
        "_id": "62f8dc21b74e1f5f2ec1a1e9",
        "total": 600,
        "createdAt": "1660476449000",
        "owner": {
            "_id": "62d98b55b74e1f5f2ec1a162",
            "nick": null
        }
    },
    {
        "_id": "62f8fea1b74e1f5f2ec1a1ec",
        "total": 3500,
        "createdAt": "1660485281000",
        "owner": {
            "_id": "62d989f1b74e1f5f2ec1a160",
            "nick": null
        }
    },
    {
        "_id": "62f8fed6b74e1f5f2ec1a1f0",
        "total": 11000,
        "createdAt": "1660485334000",
        "owner": {
            "_id": "62d989f1b74e1f5f2ec1a160",
            "nick": null
        }
    },
    {
        "_id": "62f8ff12b74e1f5f2ec1a1f3",
        "total": 2800,
        "createdAt": "1660485394000",
        "owner": {
            "_id": "62f8ff04b74e1f5f2ec1a1f1",
            "nick": null
        }
    },
    {
        "_id": "62f8ff38b74e1f5f2ec1a1f5",
        "total": 250,
        "createdAt": "1660485432000",
        "owner": {
            "_id": "62f8ff04b74e1f5f2ec1a1f1",
            "nick": null
        }
    },
    {
        "_id": "62f8ffa3b74e1f5f2ec1a1f7",
        "total": 3500,
        "createdAt": "1660485539000",
        "owner": {
            "_id": "62d989f1b74e1f5f2ec1a160",
            "nick": null
        }
    },
    {
        "_id": "62fa44d8b74e1f5f2ec1a202",
        "total": 39700,
        "createdAt": "1660568792000",
        "owner": {
            "_id": "62fa44cbb74e1f5f2ec1a1fe",
            "nick": null
        }
    },
    {
        "_id": "62fa47a3b74e1f5f2ec1a20c",
        "total": 59500,
        "createdAt": "1660569507000",
        "owner": {
            "_id": "62fa4798b74e1f5f2ec1a20a",
            "nick": null
        }
    },
    {
        "_id": "62fa4cf1b74e1f5f2ec1a210",
        "total": 10900,
        "createdAt": "1660570865000",
        "owner": {
            "_id": "62fa4798b74e1f5f2ec1a20a",
            "nick": null
        }
    },
    {
        "_id": "62fb559fb74e1f5f2ec1a237",
        "total": 3500,
        "createdAt": "1660638623000",
        "owner": {
            "_id": "62daef7db74e1f5f2ec1a16a",
            "nick": null
        }
    },
    {
        "_id": "62fb6cabb74e1f5f2ec1a2a6",
        "total": 49000,
        "createdAt": "1660644523000",
        "owner": {
            "_id": "62fb6c9eb74e1f5f2ec1a2a3",
            "nick": null
        }
    },
    {
        "_id": "62fb6cfab74e1f5f2ec1a2aa",
        "total": 3500,
        "createdAt": "1660644602000",
        "owner": {
            "_id": "62fb6cf4b74e1f5f2ec1a2a8",
            "nick": null
        }
    },
    {
        "_id": "62fb8067b74e1f5f2ec1a2ad",
        "total": 5600,
        "createdAt": "1660649575000",
        "owner": {
            "_id": "62f4ee9ab74e1f5f2ec1a1b4",
            "nick": null
        }
    },
    {
        "_id": "62fb808db74e1f5f2ec1a2af",
        "total": 7000,
        "createdAt": "1660649613000",
        "owner": {
            "_id": "62f4ee9ab74e1f5f2ec1a1b4",
            "nick": null
        }
    },
    {
        "_id": "62fb8309b74e1f5f2ec1a2b0",
        "total": 0,
        "createdAt": "1660650249000",
        "owner": {
            "_id": "62f4ee9ab74e1f5f2ec1a1b4",
            "nick": null
        }
    },
    {
        "_id": "62fb8609b74e1f5f2ec1a2b2",
        "total": 7000,
        "createdAt": "1660651017000",
        "owner": {
            "_id": "62f4ee9ab74e1f5f2ec1a1b4",
            "nick": null
        }
    },
    {
        "_id": "62fb8649b74e1f5f2ec1a2b4",
        "total": 7000,
        "createdAt": "1660651081000",
        "owner": {
            "_id": "62f4ee9ab74e1f5f2ec1a1b4",
            "nick": null
        }
    },
    {
        "_id": "62fb865fb74e1f5f2ec1a2b6",
        "total": 7000,
        "createdAt": "1660651103000",
        "owner": {
            "_id": "62f4ee9ab74e1f5f2ec1a1b4",
            "nick": null
        }
    },
    {
        "_id": "62fb8675b74e1f5f2ec1a2b8",
        "total": 7000,
        "createdAt": "1660651125000",
        "owner": {
            "_id": "62f4ee9ab74e1f5f2ec1a1b4",
            "nick": null
        }
    },
    {
        "_id": "62fb8686b74e1f5f2ec1a2ba",
        "total": 300,
        "createdAt": "1660651142000",
        "owner": {
            "_id": "62d98b55b74e1f5f2ec1a162",
            "nick": null
        }
    },
    {
        "_id": "62fb86a4b74e1f5f2ec1a2bc",
        "total": 7000,
        "createdAt": "1660651172000",
        "owner": {
            "_id": "62f4ee9ab74e1f5f2ec1a1b4",
            "nick": null
        }
    },
    {
        "_id": "62fb86b5b74e1f5f2ec1a2bd",
        "total": 0,
        "createdAt": "1660651189000",
        "owner": {
            "_id": "62f4ee9ab74e1f5f2ec1a1b4",
            "nick": null
        }
    },
    {
        "_id": "62fb8f9eb74e1f5f2ec1a2bf",
        "total": 7000,
        "createdAt": "1660653470000",
        "owner": {
            "_id": "62f4ee9ab74e1f5f2ec1a1b4",
            "nick": null
        }
    },
    {
        "_id": "62fb8fc2b74e1f5f2ec1a2c1",
        "total": 7000,
        "createdAt": "1660653506000",
        "owner": {
            "_id": "62f4ee9ab74e1f5f2ec1a1b4",
            "nick": null
        }
    },
    {
        "_id": "62fb930ab74e1f5f2ec1a2c3",
        "total": 7000,
        "createdAt": "1660654346000",
        "owner": {
            "_id": "62f4ee9ab74e1f5f2ec1a1b4",
            "nick": null
        }
    },
    {
        "_id": "62fb9384b74e1f5f2ec1a2c5",
        "total": 7000,
        "createdAt": "1660654468000",
        "owner": {
            "_id": "62f4ee9ab74e1f5f2ec1a1b4",
            "nick": null
        }
    },
    {
        "_id": "62fb94bcb74e1f5f2ec1a2c7",
        "total": 14000,
        "createdAt": "1660654780000",
        "owner": {
            "_id": "62f3b843b74e1f5f2ec1a19b",
            "nick": null
        }
    },
    {
        "_id": "62fb95a7b74e1f5f2ec1a2c9",
        "total": 7000,
        "createdAt": "1660655015000",
        "owner": {
            "_id": "62f4ee9ab74e1f5f2ec1a1b4",
            "nick": null
        }
    },
    {
        "_id": "62fba622b74e1f5f2ec1a2ca",
        "total": 0,
        "createdAt": "1660659234000",
        "owner": {
            "_id": "62f4ee9ab74e1f5f2ec1a1b4",
            "nick": null
        }
    },
    {
        "_id": "62fba634b74e1f5f2ec1a2cc",
        "total": 3500,
        "createdAt": "1660659252000",
        "owner": {
            "_id": "62f4ee9ab74e1f5f2ec1a1b4",
            "nick": null
        }
    },
    {
        "_id": "62fe04eeb74e1f5f2ec1a2e9",
        "total": 2100,
        "createdAt": "1660814574000",
        "owner": null
    },
    {
        "_id": "62fe052ab74e1f5f2ec1a2ec",
        "total": 7200,
        "createdAt": "1660814634000",
        "owner": null
    },
    {
        "_id": "62fe06beb74e1f5f2ec1a2ee",
        "total": 1400,
        "createdAt": "1660815038000",
        "owner": {
            "_id": "62d989f1b74e1f5f2ec1a160",
            "nick": null
        }
    },
    {
        "_id": "62fe0905b74e1f5f2ec1a2f1",
        "total": 2350,
        "createdAt": "1660815621000",
        "owner": {
            "_id": "62d989f1b74e1f5f2ec1a160",
            "nick": null
        }
    },
    {
        "_id": "62fe0b55b74e1f5f2ec1a2f4",
        "total": 800,
        "createdAt": "1660816213000",
        "owner": {
            "_id": "62d989f1b74e1f5f2ec1a160",
            "nick": null
        }
    },
    {
        "_id": "62fe1555b74e1f5f2ec1a2fe",
        "total": 6700,
        "createdAt": "1660818773000",
        "owner": {
            "_id": "62d98b55b74e1f5f2ec1a162",
            "nick": null
        }
    },
    {
        "_id": "62fe16f5b74e1f5f2ec1a301",
        "total": 23900,
        "createdAt": "1660819189000",
        "owner": {
            "_id": "62d98b55b74e1f5f2ec1a162",
            "nick": null
        }
    },
    {
        "_id": "62fe1764b74e1f5f2ec1a304",
        "total": 3950,
        "createdAt": "1660819300000",
        "owner": {
            "_id": "62d98b55b74e1f5f2ec1a162",
            "nick": null
        }
    },
    {
        "_id": "62fe177ab74e1f5f2ec1a306",
        "total": 300,
        "createdAt": "1660819322000",
        "owner": {
            "_id": "62d98b55b74e1f5f2ec1a162",
            "nick": null
        }
    },
    {
        "_id": "62fe204ab74e1f5f2ec1a30b",
        "total": 3200,
        "createdAt": "1660821578000",
        "owner": {
            "_id": "62d989f1b74e1f5f2ec1a160",
            "nick": null
        }
    },
    {
        "_id": "62fe4f54b74e1f5f2ec1a30d",
        "total": 900,
        "createdAt": "1660833620000",
        "owner": {
            "_id": "62629b99bf8b206433f5b3c7",
            "nick": null
        }
    },
    {
        "_id": "62fe5911b74e1f5f2ec1a311",
        "total": 9900,
        "createdAt": "1660836113000",
        "owner": {
            "_id": "62f4ee9ab74e1f5f2ec1a1b4",
            "nick": null
        }
    },
    {
        "_id": "62ff84d0b74e1f5f2ec1a317",
        "total": 750,
        "createdAt": "1660912848000",
        "owner": {
            "_id": "62fa2947b74e1f5f2ec1a1fd",
            "nick": "kasha"
        }
    },
    {
        "_id": "62ffc1f7b74e1f5f2ec1a31b",
        "total": 650,
        "createdAt": "1660928503000",
        "owner": {
            "_id": "62ffc1adb74e1f5f2ec1a318",
            "nick": null
        }
    },
    {
        "_id": "6322256cb74e1f5f2ec1a324",
        "total": null,
        "createdAt": "1663182188000",
        "owner": {
            "_id": "632205aeb74e1f5f2ec1a320",
            "nick": null
        }
    },
    {
        "_id": "632225bab74e1f5f2ec1a327",
        "total": 1100,
        "createdAt": "1663182266000",
        "owner": {
            "_id": "632205aeb74e1f5f2ec1a320",
            "nick": null
        }
    },
    {
        "_id": "6325e988b74e1f5f2ec1a32a",
        "total": 700,
        "createdAt": "1663429000000",
        "owner": {
            "_id": "62629b99bf8b206433f5b3c7",
            "nick": null
        }
    },
    {
        "_id": "632cf7dab74e1f5f2ec1a333",
        "total": 1800,
        "createdAt": "1663891418000",
        "owner": {
            "_id": "632cf782b74e1f5f2ec1a331",
            "nick": null
        }
    },
    {
        "_id": "633df3fdb74e1f5f2ec1a352",
        "total": null,
        "createdAt": "1665004541000",
        "owner": {
            "_id": "633c7088b74e1f5f2ec1a34f",
            "nick": null
        }
    },
    {
        "_id": "633df53fb74e1f5f2ec1a353",
        "total": null,
        "createdAt": "1665004863000",
        "owner": {
            "_id": "633c7088b74e1f5f2ec1a34f",
            "nick": null
        }
    },
    {
        "_id": "633ec4a7b74e1f5f2ec1a354",
        "total": 0,
        "createdAt": "1665057959000",
        "owner": {
            "_id": "633c7088b74e1f5f2ec1a34f",
            "nick": null
        }
    }
];

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
const OrderList = ({ orders }) => {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    let headCells = [
        {
            id: '#',
            numeric: true,
            disablePadding: true,
            label: '#',
            align: "center"
        },
        {
            id: 'Date',
            numeric: true,
            disablePadding: true,
            label: 'Date',
        },
        {
            id: 'Order ID',
            numeric: true,
            disablePadding: true,
            label: 'Order ID',
        },
        {
            id: 'Total ($)',
            numeric: true,
            disablePadding: true,
            label: 'Total ($)',
            align: "right"
        },
        {
            id: 'Owner',
            numeric: true,
            disablePadding: true,
            label: 'Owner',
            align: "right"
        },
        {
            id: 'Note',
            numeric: true,
            disablePadding: true,
            label: 'Note',
            align: "right"
        },
    ]
    {/*<StyledTableCell align={headCell.align}>{headCell.label}</StyledTableCell>*/ }
    /*    const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
          };*/
    return (
        <>
            <Container maxWidth="lg">
                <TableContainer component={Paper} >
                    <Table sx={{ overflow: 'scroll' }} >
                        <TableHead>
                            <TableRow>
                                {
                                    headCells.map(headCell => {
                                        return <StyledTableCell align={headCell.align}>{headCell.label}</StyledTableCell>
                                        /*return (
                                            <StyledTableCell
                                                key={headCell.id}
                                                align={headCell.align}
                                                padding={headCell.disablePadding ? 'none' : 'normal'}
                                                sortDirection={orderBy === headCell.id ? order : false}
                                            >
                                                <TableSortLabel
                                                    active={orderBy === headCell.id}
                                                    direction={orderBy === headCell.id ? order : 'asc'}
                                                >
                                                    {headCell.label}
                                                    {orderBy === headCell.id ? (
                                                        <Box component="span" sx={visuallyHidden}>
                                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                        </Box>
                                                    ) : null}
                                                </TableSortLabel>
                                            </StyledTableCell>
                                        )*/
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                orders
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((order, index) => {
                                        return (
                                            <StyledTableRow>
                                                <StyledTableCell align="right" >
                                                    <Typography>
                                                        {index + 1}.
                                                    </Typography>
                                                </StyledTableCell>
                                                <StyledTableCell  >
                                                    {new Date(+order.createdAt).toLocaleString()}
                                                </StyledTableCell>
                                                <StyledTableCell  >
                                                    <Link href='#'>
                                                        <Typography >
                                                            {order._id}
                                                        </Typography>
                                                    </Link>
                                                </StyledTableCell>
                                                <StyledTableCell align="right" >
                                                    <Typography >
                                                        {order.total}
                                                    </Typography>
                                                </StyledTableCell>
                                                <StyledTableCell align="right" >
                                                    <Link href='#'>
                                                        <Typography>
                                                            {order.owner?.nick}
                                                        </Typography>
                                                    </Link>
                                                </StyledTableCell>
                                                <StyledTableCell align="right" >
                                                    <Typography>
                                                        {order.notes}
                                                    </Typography>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        )
                                    })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={exampleOrderList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Container>
        </>
    )
}
export { exampleOrderList, OrderList };