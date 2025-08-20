import { Skeleton } from "@mui/material";
import styled from "@emotion/styled";

export const CategoryHeaderSkeleton=styled(Skeleton)`
  display: flex;
  flex-direction: row;
  direction: rtl;
  align-items: center;
  justify-content: flex-start;
  width: 15%;
  height:40px;
  margin-left: auto; /* ✅ Pushes it to the right */
  border-radius: 15px 0 0  15px;
  background: rgba(253, 224, 71, 0.3);
  font-size:26px;

  @media (max-width: 640px) {
    width:25%;
  }
`;

export const ImageSkeleton=styled(Skeleton)`
 width:100%;
 height:100%;
 border-radius:50px;
`;


export const ItemTitleSkeleton=styled(Skeleton)`
 width:75%;
 height:32px;
 border-radius:15px;
 background: linear-gradient(
  to right,
  rgba(2, 132, 199, 0.3),   /* #0284C7 with 30% opacity */
  rgba(56, 189, 248, 0.3)   /* #38BDF8 with 30% opacity */
);
font-size:22px;
`;


export const ItemDescSkeleton=styled(Skeleton)`
 width:50%; 
 height:48px;
 border-radius: 15px;
 font-size:16px;
`;

export const SelectorLabelSkeleton=styled(Skeleton)`
 width:250px;
 height:28px;
 border-radius: 15px;
 background: rgba(2, 132, 199, 0.3);
 font-size:18px;
 margin-bottom:10px;
`;

export const SelectorButtonSkeleton = styled(Skeleton)`
  display: block;              /* force block so height applies */
  border-radius: 9999px;
  width: 100px;
  height: 38px;                /* now respected */
  font-size: 16px;             /* optional (Skeleton ignores text anyway) */
  padding: 6px 10px;           /* may not apply as you expect on Skeleton */
  background: rgba(253, 224, 71, 0.3);
`;

export const PriceSkeleton = styled(Skeleton)`
  width:100px;
  height:30px;
  border-radius:15px;
 background: linear-gradient(
  to right,
  rgba(2, 132, 199, 0.3),   /* #0284C7 with 30% opacity */
  rgba(56, 189, 248, 0.3)   /* #38BDF8 with 30% opacity */
);
  margin-top: 4px;
  font-size: 20px;
  text-align: right;
);
`;

