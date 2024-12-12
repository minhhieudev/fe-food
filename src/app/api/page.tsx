"use client";
import React, { useEffect, useState } from "react"
import ShowTitle from "../components/ShowTitle"
import { Language } from "../utils/language/language";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon, ClipboardDocumentCheckIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { getClientSize,dataApi } from "../utils/units";
import "./api.css";
import { useAppDispatch } from "@/core/services/hook";
import { AuthActions } from "@/modules/auth/slice";
import { toast } from "react-toastify";

export default function Api() {
    const dispatch = useAppDispatch();
    const lang = new Language(window);
    const [isShowPass, setIsShowPass] = useState<boolean>(false);
    const [Request, setIsShowRequest] = useState<boolean>(false);
    const [isShowResponse, setIsShowResponse] = useState<boolean>(false);
    const [widthSize, setWidthSize] = useState<number>(0)
    const [apiKey, setApiKey] = useState('');
    const [dataRequest, setDataRequest] = useState<any>()
    const [dataResponse, setDataResponse] = useState<any>()
    const [dataExample, seDataExample] = useState<any>()
    const [dataExampleResponse, seDataExampleResponse] = useState<any>()
    const [url, setUrl] = useState<string>()
    const [key, setKey] = useState<boolean>(false)
    
    window.onresize = function() {
        var size = getClientSize();
        setWidthSize(size.width)
    }
    const handleRefresh = () =>{
        dispatch(
            AuthActions.getApiKey({
                onSuccess: (rs: any) => {
                    setApiKey(rs.apiKey)
                    setIsShowPass(true);
                },
                onFail: () => {},
            })
        )
    }
    const handleGetAPIKey = () =>{
                dispatch(
            AuthActions.getCurrentApiKey({
                onSuccess: (rs: any) => {
                    setApiKey(rs.apiKey)
                },
                onFail: () => {},
            })
        )
    }
    useEffect(()=>{
        handleGetAPIKey()
    },[])
    /*
        Người viết : Đinh Văn Thành
        Ngày viết : 21-05-2024
        Chức năng : copy thuộc tính cần lấy
        Params : data:  dữ liệu của thuộc tính càn lấy
    */
    const copyToClipboard = (data:any) => {
        navigator.clipboard.writeText(JSON.stringify(data))
        .then()
        .catch()
    };
    /*
        Người viết : Đinh Văn Thành
        Ngày viết : 25-05-2024
        Chức năng: Render chuỗi json ra html hiện thị màn hình

        Ghi chú: các cấp độ hiện thị ra màn hình
            - Câp độ một: nếu phần từ không có phần tử con bên trong thì hiện theo dạng sau
                type: tên của thuộc tính 
                typeOf: kiểu của thuộc tính
                name: giá trị của thuộc tính
            ====================
            VD: {
                name: "dev"
            }
            type: name,
            typeOf: string,
            name: dev,
            =====================
            - cấp độ hai: nếu phần tử có phần tử con thì đưa tất phần tử con vào một mảng 
            type: tên của thuộc tính
            typeOf: kiểu của thuộc tính
            name : mảng của các phần tử con có dạng
            [
                _type: tên của thuộc tính của phần tử con
                _typeOf: kiểu của thuộc tính của phần tử con
                _name : giá trị của thuộc tính của phần tử con
            ]
        ================================
        Vd: body:{
            "_id": "664f45bc5c4630cc75a53e62",
            "name": "Youtube"
        }
        type: body,
        typeOf: object,
        name: [
            {
                _type:id,
                _typeOf: string,
                _name: "664f45bc5c4630cc75a53e62"
            },
            ..........
        ]
        =============================
        Phần tử cha ( phần tủ cuối cùng ) có dạng một mảng chứa một đối tượng
        [
            key: tên của thuộc tính
            method: kiểu của thuộc tính
            data: mạng chưa các thành phần như ( kết quả trả về của api, thông điệp của api ) có dạng
            [
                type: tên của thuộc tính 
                typeOf: kiểu của thuộc tính 
                name : giá trị của thuộc tính 
            ]
            value: giá trị của phần từ con mà lấy được ở phần trên
        ]
    */
    const handleEndPoints = (event:any)=>{
        setKey(event.key)
        setDataRequest([]);
        setDataResponse([]);
        setUrl(event.url);
        seDataExample("");
        seDataExampleResponse("");
        const  objectKeyGeneralSection = Object.keys(event)
        if(event.body){
            const  objectKey = Object.keys(event.body)
            let array:any = [];
            objectKey.map((t: any)=>{
                if(t!== 'customerEnteredValues'){
                    array.push({
                        "type":t,
                        "typeOf":typeof (event.body[t]),
                        "name":event.body[t]
                    })
                }else{
                    event.body[t].map((g:any)=>{
                        const objectKeyCustomer = Object.keys(g)
                        const dataServiceGroup = objectKeyCustomer.map((h:any)=>{
                            return(
                                {
                                    "_type": h,
                                    "_typeOf":typeof(g[h]),
                                    "_name": g[h]
                                }
                            )
                        })
                        array.push({
                            "type": t,
                            "typeOf": typeof(dataServiceGroup),
                            "name": dataServiceGroup
                        })
                    });
                }
            })
            setDataRequest([
                {
                    "key":objectKeyGeneralSection[5],
                    "value":array
                }
            ])

            seDataExample(event.body)
        }else if(event.param){
            const  objectKey = Object.keys(event.param)
            setDataRequest([
                {
                    "key":"Param",
                    "value":[
                        {
                            "type":objectKey[0],
                            "typeOf":typeof (event.param.orderID),
                            "name":event.param.orderID
                        }
                    ]
                }
            ])
            seDataExample(event.param)
        }
        /*===============================================================================================*/ 
        if(event.Body.servicePackages){
            const _dataResponse = event.Body?.servicePackages?.map((e:any)=>{
                let array:any = [];
                const objectKeyResponse = Object.keys(e)
                objectKeyResponse.map((event:any)=>{
                    if(event !== 'attributes' && event !=="serviceGroup"){
                        array.push(
                            {
                                "type": event,
                                "typeOf":typeof (e[event]),
                                "name": e[event]
                            }
                        )
                    }else if(event ==="serviceGroup"){
                        const objectKeyServiceGroup = Object.keys( e[event])
                        const dataServiceGroup =  objectKeyServiceGroup.map((g:any)=>{
                            return(
                                {
                                    "_type": g,
                                    "_typeOf":typeof(e[event][g]),
                                    "_name": e[event][g]
                                }
                            )
                        });
                        array.push({
                            "type": event,
                            "typeOf": typeof(dataServiceGroup),
                            "name": dataServiceGroup
                        })
                    }
                    else{
                        e[event].map((h:any)=>{
                            const objectKeyResponseAttributes = Object.keys(h)
                            const dataAttributes = objectKeyResponseAttributes.map((t:any)=>{
                                return(
                                    {   
                                        "_type": t,
                                        "_typeOf":typeof(h[t]),
                                        "_name": h[t]
                                    }
                                )
                            })
                            array.push({
                                "type": event,
                                "typeOf": typeof(dataAttributes),
                                "name": dataAttributes
                            })
                        })
                    }
                });
                return array
            });
            setDataResponse([
                {
                    "key": objectKeyGeneralSection.length <= 6 ? objectKeyGeneralSection[5] : objectKeyGeneralSection[6],
                    "method": "application/json",
                    "data":[
                        {
                            "type":Object.keys((event.Body))[0],
                            "typeOf":"string",
                            "name":"true",
                        },
                        {
                            "type":Object.keys((event.Body))[1],
                            "typeOf":typeof (_dataResponse),
                            "name":"",
                        }
                    ],
                    "value":_dataResponse
                }
            ]);
        }else if(event.Body.data){
            const objectKeyResponse = Object.keys(event.Body.data)
            const _dataResponse = objectKeyResponse.map((h:any)=>{
                let array:any = [];
                const _objectKeyResponse = Object.keys(event.Body.data[h])
                const dataGeneralSection = _objectKeyResponse.map((t:any)=>{
                    return(
                        {   
                            "_type": t,
                            "_typeOf":typeof(event.Body.data[h][t]),
                            "_name": event.Body.data[h][t]
                        }
                    )
                })
                array.push(
                    {
                        "type": h,
                        "typeOf":typeof (dataGeneralSection),
                        "name": dataGeneralSection
                    }
                );
                return array
            });
            setDataResponse([
                {
                    "key": objectKeyGeneralSection.length <= 6 ? objectKeyGeneralSection[5] : objectKeyGeneralSection[6],
                    "method": "application/json",
                    "data":[
                        {
                            "type":Object.keys((event.Body))[0],
                            "typeOf":"string",
                            "name":"true",
                        },
                        {
                            "type":Object.keys((event.Body))[1],
                            "typeOf":typeof (_dataResponse),
                            "name":"",
                        }
                    ],
                    "value":_dataResponse
                }
            ]);
        }else{
            const objectKeyResponse = Object.keys(event.Body)
            const _dataResponse = objectKeyResponse.map((h:any)=>{
                let array:any = [];
                array.push(
                    {
                        "type": h,
                        "typeOf":typeof (event.Body[h]),
                        "name": event.Body[h].toString()
                    }
                );
                return array
            })
            setDataResponse([
                {
                    "key": objectKeyGeneralSection.length <= 6 ? objectKeyGeneralSection[5] : objectKeyGeneralSection[6],
                    "method": "application/json",
                    "value":_dataResponse
                }
            ]);
        }
        seDataExampleResponse(event.Body);
    };
    /*================================== END =====================================*/

    /*
        Người viết: Đinh Văn Thành
        Ngày viết: 27-05-2024
        Chức năng: khi mở màn hình api thì hiển thị phần tử đầu tiên
    */
    useEffect(()=>{
        let dataFirst = dataApi[0];
        handleEndPoints(dataFirst);
    },[])
    /*===================== END ================================*/
    return (<>
    <ShowTitle title={lang.gen("menu.api")} />
    <div className="flex gap-[24px] w-[1568px] h-auto max-lg:hidden">
        <div className="bg-[#FFFFFF] w-[300px] h-[344px] border border-[#E3E5E5] rounded-[12px] p-[24px]">
            <p className="text-[#979C9E] text-[18px] leading-[24px] font-bold">ENDPOINTS</p>
            {dataApi && dataApi.map((item:any, index: number)=>{
                return (
                    <div key={index} className= {item.key === key 
                    ? "bg-[#F2F4F5] rounded-[4px] w-[252px] h-[40px] flex justify-between px-[12px] py-[12px] cursor-pointer "
                    :"flex justify-between px-[12px] py-[12px] cursor-pointer" }
                        onClick={(e:any) =>{handleEndPoints(item)}}
                    >
                        <p className={item.method == 'delete' ? "text-[#979C9E] leading-[20px] font-normal text-[16px] line-through":"text-[#090A0A] leading-[20px] font-normal text-[16px]" }>{item.key}</p>
                        <p className="text-[14px] leading-[16p] font-normal text-[#72777A] uppercase">{item.method}</p>
                    </div>
                )
            })}
            
        </div>
        <div className="bg-[#F2F4F5] w-[1220px] overflow-auto rounded-[12px] p-[24px] rounded-[12px] border border-[#F2F4F5] ">
            <div className="bg-[#fff] w-[1172px] h-[104px] p-[12px] rounded-[12px] ">
                <p className="text-[16px] leading-[20px] font-bold text-[#090A0A]">API key</p>
                <div className="flex gap-5 mt-[12px]">
                    <div className="rounded-[4px] bg-[#E3E5E5] flex">
                        <input
                            type={isShowPass ? "text" : "password"}
                            className="w-[885px] h-[40px] px-[12px] api-input"
                            placeholder="********************************************************"
                            value={apiKey}
                        />
                        <button
                                className="ml-[-2rem]"
                                type="button"
                                onClick={() => {
                                    setIsShowPass(!isShowPass);
                                }}
                            >
                                {isShowPass ? (
                                    <EyeIcon width={18} className="text-default-400 " />
                                    ) : (
                                    <EyeSlashIcon
                                        width={18}
                                        className="text-default-400"
                                    />
                                )}
                        </button>
                    </div>
                    <div onClick={handleRefresh} className="flex w-[78px] h-[40px] pt-[10px] gap-2 cursor-pointer">
                        <ArrowPathRoundedSquareIcon className="h-[18px] w-[20px] text-[#72777A] mt-[2px] "/>
                        <p className="font-medium text-[14px] leading-[20px] text-[#72777A]">Refresh</p>
                    </div>
                    <div onClick={() =>{copyToClipboard(apiKey)}} className="w-[137px] h-[40px] rounded-[4px] p-[8px] bg-[#FF8900] flex gap-2 cursor-pointer ">
                        <ClipboardDocumentCheckIcon className="w-[11px] h-[13] text-[#FFFFFF]"/>
                        <p className="text-[14px] leading-[20px] text-[#FFFFFF] font-medium">Copy API Key</p>
                    </div>
                </div>
            </div>
            <div className="bg-[#fff] w-[1172px] h-auto p-[24px] rounded-[12px] mt-[24px]">
                <p className="text-[18px] leading-[24px] font-bold text-[#979C9E] mb-[12px] ">Request</p>
                <div className="justify-between">
                    <input
                        className="h-[40px] w-[1100px] api-input px-[12px] text-[#FFAA47] "
                        value={url}
                    />
                    <button
                        className="ml-[-0.2rem]"
                        type="button"
                        onClick={() => {}}
                        >
                            <ClipboardDocumentCheckIcon className="h-[13px] w-[11px] text-[#E3E5E5]"/>
                        </button>
                </div>
                <div className="w-[1124px] h-[1px] bg-[#F2F4F5] my-3"></div>
                { dataRequest && dataRequest?.length > 0 ? <div className="flex gap-3">
                    <div className="w-[680px] ">
                        {dataRequest?.map((item: any, index: number)=>{
                            return (<>
                                <div key={index}>
                                    <div className="flex gap-2">
                                        <ChevronDownIcon width={14} />
                                        <p className="font-bold text-[16px] leading-[20px] text-[#090A0A]">{item?.key}</p>
                                    </div>
                                    {item?.value.map((item1:any, index1: number)=>{
                                        if(item1.typeOf !== "object"){
                                            return (
                                                <div key={index1}>
                                                    <div>
                                                        <div className="flex gap-2 ml-10 mt-3 ">
                                                            <p className="text-[#090A0A] font-normal text-[16px] leading-[20px]">{item1?.type}</p>
                                                            <p className="text-[#979C9E] font-normal text-[16px] leading-[16px] mt-0.5"> {item1?.typeOf}</p>
                                                        </div>
                                                        <div className="ml-10 mt-5 flex justify-between">
                                                            <p className="text-[#979C9E] font-normal text-[16px] leading-[20px]"> {item1?.name}</p>
                                                            <p className="text-[#FF5247] text-[14px] leading-[16px] font-normal">{item1?.method}</p>
                                                        </div>
                                                    </div>
                                                    <div className="w-[622px] h-[1px] bg-[#F2F4F5] my-1 ml-10"></div>
                                                </div>
                                            )
                                        }else{
                                            return(<>
                                                <div>
                                                    <div className="flex gap-2 ml-10 mt-3">
                                                        <p className="text-[#090A0A] font-normal text-[16px] leading-[20px]">{item1?.type}</p>
                                                        <p className="text-[#979C9E] font-normal text-[16px] leading-[16px] mt-0.5">{item1?.typeOf}</p>
                                                    </div>
                                                    {item1?.name?.map((item2: any, index2:number)=>{
                                                        return(
                                                            <div key={index2}>
                                                                <div className="ml-[5.2rem] mt-3">
                                                                    <div className="flex gap-2">
                                                                        <p className="text-[#090A0A] font-normal text-[16px] leading-[20px]">{item2?._type}</p>
                                                                        <p className="text-[#979C9E] font-normal text-[16px] leading-[16px] mt-0.5">{item2?._typeOf}</p>
                                                                    </div>
                                                                    <p className="text-[#979C9E] font-normal text-[16px] leading-[16px] mt-3">{item2?._name}</p>
                                                                </div>
                                                                {item1?.name[index+1] ?<div className="w-[574px] h-[1px] bg-[#F2F4F5] ml-[5.2rem] mt-3"></div> : "" }
                                                            </div>
                                                        )
                                                    })}
                                                    
                                                </div>
                                            
                                            </>)
                                        }
                                    })}
                                </div>
                            </>)
                        })}
                        
                    </div>
                    <div className="bg-[#F7F9FA] w-[420px] rounded-[12px] p-[12px]">
                        <div className="flex justify-between">
                            <p className="text-[18px] leading-[24px] font-bold text[#090A0A] mt-1">Example Request</p>
                            <div onClick={() =>{copyToClipboard(dataExample)}} className="w-[52px] h-[40px] py-[8px] px-[13px] bg-[#fff] rounded-[4px] border border-[#CDCFD0] cursor-pointer">
                                <ClipboardDocumentCheckIcon className="h-[24px] w-[24px] text-[#E3E5E5]"/>
                            </div>
                        </div>
                        <div style={{ whiteSpace: "pre-wrap" }} className={dataExample && dataExample !== ""
                            ? "w-[400px] h-[300px] mt-2"  
                            : "w-[400px] h-[300px] mt-2"
                        }
                        >
                            {dataExample && dataExample !== "" ?JSON.stringify(dataExample, null, 4):""}
                        </div>
                    </div>
                </div> : <></> }
                
                <div className="mt-[30px] mb-[15px] flex gap-4">
                    <p className="text-[18px] leading-[24px] font-bold text-[#979C9E]">Response</p>
                    <p className="text-[14px] leading-[16px] font-bold text-[#FF8900] mt-1">200</p>
                    <p className="text-[14px] leading-[16px] font-bold text-[#979C9E] mt-1">400</p>
                    <p className="text-[14px] leading-[16px] font-bold text-[#979C9E] mt-1">401</p>
                </div>
                <div className="w-[1124px] h-[1px] bg-[#F2F4F5] my-3"></div>
                <div className="flex gap-3">
                    <div className={dataResponse 
                        && dataResponse[0]?.value 
                        && dataResponse[0]?.value?.find((e:any)=> e.type !== "message").length > 1
                        && dataResponse[0]?.value?.length > 1
                            ? "w-[680px] h-auto"  
                            : "w-[680px] h-[700px]"
                        }
                    >
                        {dataResponse?.map((item: any, index: number)=>{
                            return(
                                <div key={index}>
                                    <div className="flex justify-between">
                                        <div className="flex gap-2">
                                            <ChevronDownIcon width={14} />
                                            <p className="font-bold text-[16px] leading-[20px] text-[#090A0A]">{item?.key}</p>
                                        </div>
                                        <p className="text-[#72777A] font-nomal text-[14px] leading-[16px]">{item?.method}</p>
                                    </div>
                                    {item?.data?.map((i:any,index0:number)=>{
                                        return(
                                            <div key={index0}>
                                                <div>
                                                    <div className="flex gap-2 ml-10 mt-3 ">
                                                        <p className="text-[#090A0A] font-normal text-[16px] leading-[20px]">{i?.type}</p>
                                                        <p className="text-[#979C9E] font-normal text-[16px] leading-[16px] mt-0.5"> {i?.typeOf}</p>
                                                    </div>
                                                    <div className="ml-10 mt-5 flex justify-between">
                                                        <p className="text-[#979C9E] font-normal text-[16px] leading-[20px]"> {i?.name}</p>
                                                    </div>
                                                </div>
                                                <div className="w-[622px] h-[1px] bg-[#F2F4F5] my-1 ml-10"></div>
                                            </div>
                                            
                                        )
                                    })}
                                    {item?.value?.map((item1:any, index1: number)=>{
                                        return (
                                            <div key={index1}>
                                                {item1?.map((item2:any, index2: number)=>{
                                                    if(item2.typeOf !== "object" || (item2.typeOf === "object" && item2.name === null)){
                                                        return (
                                                            <div key={index2}>
                                                                <div>
                                                                    <div className="flex gap-2 ml-10 mt-3 ">
                                                                        <p className="text-[#090A0A] font-normal text-[16px] leading-[20px]">{item2?.type}</p>
                                                                        <p className="text-[#979C9E] font-normal text-[16px] leading-[16px] mt-0.5"> {item2?.typeOf}</p>
                                                                    </div>
                                                                    <div className="ml-10 mt-5 flex justify-between">
                                                                        <p className="text-[#979C9E] font-normal text-[16px] leading-[20px]"> {item2?.typeOf === 'boolean' ? (item2?.name).toString() : item2?.name}</p>
                                                                        <p className="text-[#FF5247] text-[14px] leading-[16px] font-normal">{item2?.method}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="w-[622px] h-[1px] bg-[#F2F4F5] my-1 ml-10"></div>
                                                            </div>
                                                        )
                                                    }else{
                                                        return(<>
                                                            <div>
                                                                <div className="flex gap-2 ml-10 mt-3">
                                                                    <p className="text-[#090A0A] font-normal text-[16px] leading-[20px]">{item2?.type}</p>
                                                                    <p className="text-[#979C9E] font-normal text-[16px] leading-[16px] mt-0.5">{item2?.typeOf}</p>
                                                                </div>
                                                                {item2?.type === 'serviceTags'? <p className="text-[#979C9E] font-normal text-[16px] leading-[16px] ml-10 mt-3">{item2?.name[0]}</p> : "" }
                                                                {item2?.name?.map((item3: any, index3:number)=>{
                                                                    return(
                                                                        <>
                                                                            <div className="ml-[5.2rem] mt-3" key={index3}>
                                                                                <div className="flex gap-2">
                                                                                    <p className="text-[#090A0A] font-normal text-[16px] leading-[20px]">{item3?._type}</p>
                                                                                    <p className="text-[#979C9E] font-normal text-[16px] leading-[16px] mt-0.5">{item3?._typeOf}</p>
                                                                                </div>
                                                                                <p className="text-[#979C9E] font-normal text-[16px] leading-[16px] mt-3">{item3?._typeOf === 'boolean' ? (item3?._name).toString() : item3?._name}</p>
                                                                            </div>
                                                                            {item2?.name[index+1] ?<div className="w-[574px] h-[1px] bg-[#F2F4F5] ml-[5.2rem] mt-3"></div> : "" }
                                                                        </>
                                                                    )
                                                                })}
                                                                
                                                            </div>
                                                        
                                                        </>)
                                                    }
                                                })}
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                    <div className="bg-[#F7F9FA] w-[420px] rounded-[12px] p-[12px]">
                        <div className="flex justify-between">
                            <p className="text-[18px] leading-[24px] font-bold text[#090A0A] mt-1">Example Response</p>
                            <div onClick={() =>{copyToClipboard(dataExampleResponse)}} className="w-[52px] h-[40px] py-[8px] px-[13px] bg-[#fff] rounded-[4px] border border-[#CDCFD0] cursor-pointer">
                                <ClipboardDocumentCheckIcon className="h-[24px] w-[24px] text-[#E3E5E5]"/>
                            </div>
                        </div>
                        <div style={{ whiteSpace: "pre-wrap" }} className= {dataExampleResponse && dataExampleResponse !== ""
                            ? "w-[400px] h-auto mt-2 "  
                            : "w-[400px] h-auto mt-2"
                        }>
                            {JSON.stringify(dataExampleResponse, null, 4)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* ---------------------------------- RESPONSIVE ---------------------------------- */}
    <div className="hidden max-lg:flex bg-[#F2F4F5] rounded-[12px] p-[24px] rounded-[12px] border border-[#F2F4F5] flex-col">
        <div className="bg-[#fff] p-[12px] rounded-[12px] ">
                <p className="text-[16px] leading-[20px] font-bold text-[#090A0A]">API key</p>
                <div className="flex gap-5 mt-[12px]">
                    <div className="rounded-[4px] flex w-full px-[12px] api-input">
                        <input
                            type={isShowPass ? "text" : "password"}
                            className="w-[95%]"
                            placeholder="************************"
                            value={apiKey}
                        />
                        <button
                                className="ml-[10px]"
                                type="button"
                                onClick={() => {
                                    setIsShowPass(!isShowPass);
                                }}
                            >
                                {isShowPass ? (
                                    <EyeIcon width={18} className="text-default-400 " />
                                    ) : (
                                    <EyeSlashIcon
                                        width={18}
                                        className="text-default-400"
                                    />
                                )}
                        </button>
                    </div>
                    <div onClick={handleRefresh} className="flex w-[78px] h-[40px] pt-[10px] gap-2 cursor-pointer">
                        <ArrowPathRoundedSquareIcon className="h-[11px] w-[15px] text-[#72777A] mt-[4px] "/>
                        <p className="font-medium text-[14px] leading-[20px] text-[#72777A]">Refresh</p>
                    </div>
                    <div onClick={() =>{copyToClipboard(apiKey)}} className={widthSize > 700 
                    ? "w-[180px] h-[40px] rounded-[4px] p-[8px] bg-[#FF8900] flex gap-2 " 
                    : widthSize < 500 ? "w-[400px] h-[40px] rounded-[4px] p-[8px] bg-[#FF8900] flex gap-2 " : "w-[230px] h-[40px] rounded-[4px] p-[8px] bg-[#FF8900] flex gap-2 "
                    }>
                        <ClipboardDocumentCheckIcon className="w-[11px] h-[13] text-[#FFFFFF]"/>
                        <p className="text-[14px] leading-[20px] text-[#FFFFFF] font-medium">Copy API Key</p>
                    </div>
                </div>
        </div>
        <div className="bg-[#fff] w-full p-[24px] rounded-[12px] mt-[24px]">
                <p className="text-[18px] leading-[24px] font-bold text-[#979C9E] mb-[12px] ">Request</p>
                <div className="justify-between">
                    <input
                        className="h-[40px] w-full api-input px-[12px] text-[#FFAA47] "
                        value={url}
                    />
                    <button
                        className=""
                        type="button"
                        onClick={() => {}}
                        >
                            <ClipboardDocumentCheckIcon className="h-[13px] w-[11px] text-[#E3E5E5] ml-[-2rem] pt-[6px]"/>
                        </button>
                </div>
                <div className="w-full h-[1px] bg-[#F2F4F5] my-3"></div>
                {dataRequest && dataRequest?.length > 0 ? 
                <>
                    <div className="flex gap-5">
                        <p
                            onClick={()=>{setIsShowRequest(!Request)}}
                            className={Request ? "text-[#72777A] text-[16px] font-bold leading-[24px] cursor-pointer" : "text-[#FF8900] text-[16px] font-bold leading-[24px] cursor-pointer"} >
                            Request
                            {Request? "" :<div className="w-[60px] h-[1px] bg-[#FF8900] mt-[1rem]"></div>}
                        </p>
                        <p 
                            onClick={()=>{setIsShowRequest(!Request)}}
                            className={Request ? "text-[#FF8900] text-[16px] font-bold leading-[24px] cursor-pointer" : "text-[#72777A] text-[16px] font-bold leading-[24px] cursor-pointer"}>
                            Exemple
                            {Request? <div className="w-[60px] h-[1px] bg-[#FF8900] mt-[1rem]"></div> :""}
                        </p>
                    </div>
                    <div className="w-full h-[1px] bg-[#F2F4F5] mt-[0.1rem] mb-[1rem] "></div>
                    <div className="flex gap-3">
                        <div className={Request ? "hidden":"w-full overflow-y-scroll no-scrollbar"}>
                            {dataRequest?.map((item: any, index: number)=>{
                                return (<>
                                    <div key={index}>
                                        <div className="flex gap-2">
                                            <ChevronDownIcon width={14} />
                                            <p className="font-bold text-[16px] leading-[20px] text-[#090A0A]">{item?.key}</p>
                                        </div>
                                        {item?.value?.map((item1:any, index1: number)=>{
                                            if(item1.typeOf !== "object"){
                                                return (<>
                                                    <div>
                                                        <div className="flex gap-2 ml-10 mt-3 ">
                                                            <p className="text-[#090A0A] font-normal text-[16px] leading-[20px]">{item1?.type}</p>
                                                            <p className="text-[#979C9E] font-normal text-[16px] leading-[16px] mt-0.5"> {item1?.typeOf}</p>
                                                        </div>
                                                        <div className="ml-10 mt-5 flex justify-between">
                                                            <p className="text-[#979C9E] font-normal text-[16px] leading-[20px]"> {item1?.name}</p>
                                                            <p className="text-[#FF5247] text-[14px] leading-[16px] font-normal">{item1?.method}</p>
                                                        </div>
                                                    </div>
                                                    <div className="w-full] h-[1px] bg-[#F2F4F5] my-3 ml-10"></div>
                                                </>)
                                            }else{
                                                return(<>
                                                    <div>
                                                        <div className="flex gap-2 ml-10 mt-3">
                                                            <p className="text-[#090A0A] font-normal text-[16px] leading-[20px]">{item1?.type}</p>
                                                            <p className="text-[#979C9E] font-normal text-[16px] leading-[16px] mt-0.5">{item1?.typeOf}</p>
                                                        </div>
                                                        {item1?.name?.map((item2: any, index:number)=>{
                                                            return(
                                                                <>
                                                                    <div className="ml-[5.2rem] mt-3">
                                                                        <div className="flex gap-2">
                                                                            <p className="text-[#090A0A] font-normal text-[16px] leading-[20px]">{item2?._type}</p>
                                                                            <p className="text-[#979C9E] font-normal text-[16px] leading-[16px] mt-0.5">{item2?._typeOf}</p>
                                                                        </div>
                                                                        <p className="text-[#979C9E] font-normal text-[16px] leading-[16px] mt-3">{item2?._name}</p>
                                                                    </div>
                                                                    {item1?.name[index+1] ?<div className="w-full] h-[1px] bg-[#F2F4F5] my-3 ml-10"></div> : "" }
                                                                </>
                                                            )
                                                        })}
                                                        
                                                    </div>
                                                
                                                </>)
                                            }
                                        })}
                                    </div>
                                </>)
                            })}
                        </div>
                        <div className={Request ? "bg-[#F7F9FA] w-full rounded-[12px] p-[12px]" : "hidden"}>
                            <div className="flex justify-between">
                                <p className="text-[18px] leading-[24px] font-bold text[#090A0A] mt-1">Example Request</p>
                                <div onClick={() =>{copyToClipboard(dataExample)}} className="w-[52px] h-[40px] py-[8px] px-[13px] bg-[#fff] rounded-[4px] border border-[#CDCFD0] cursor-pointer">
                                    <ClipboardDocumentCheckIcon className="h-[24px] w-[24px] text-[#E3E5E5]"/>
                                </div>
                            </div>
                            <div style={{ whiteSpace: "pre-wrap" }} className="w-full mt-2">
                                {JSON.stringify(dataExample, null, 4)}
                            </div>
                        </div>
                    </div>
                </>
                :<></>}
                <div className="mt-[30px] mb-[15px] flex gap-4">
                    <p className="text-[18px] leading-[24px] font-bold text-[#979C9E]">Response</p>
                    <p className="text-[14px] leading-[16px] font-bold text-[#FF8900] mt-1">200</p>
                    <p className="text-[14px] leading-[16px] font-bold text-[#979C9E] mt-1">400</p>
                    <p className="text-[14px] leading-[16px] font-bold text-[#979C9E] mt-1">401</p>
                </div>
                <div className="w-full h-[1px] bg-[#F2F4F5] my-3"></div>
                <div className="flex gap-5">
                    <p
                        onClick={()=>{setIsShowResponse(!isShowResponse)}}
                        className={isShowResponse ? "text-[#72777A] text-[16px] font-bold leading-[24px] cursor-pointer" : "text-[#FF8900] text-[16px] font-bold leading-[24px] cursor-pointer"} >
                        Response
                        {isShowResponse? "" :<div className="w-[60px] h-[1px] bg-[#FF8900] mt-[1rem]"></div>}
                    </p>
                    <p 
                        onClick={()=>{setIsShowResponse(!isShowResponse)}}
                        className={isShowResponse ? "text-[#FF8900] text-[16px] font-bold leading-[24px] cursor-pointer" : "text-[#72777A] text-[16px] font-bold leading-[24px] cursor-pointer"}>
                        Exemple
                        {isShowResponse? <div className="w-[60px] h-[1px] bg-[#FF8900] mt-[1rem]"></div> :""}
                    </p>
                </div>
                <div className="w-full h-[1px] bg-[#F2F4F5] mt-[0.1rem] mb-[1rem] "></div>
                <div className="flex gap-3">
                    <div className={isShowResponse 
                        ? "hidden"
                        : dataResponse 
                        && dataResponse[0]?.value 
                        && dataResponse[0]?.value.find((e:any)=> e.type !== "message").length > 1
                        && dataResponse[0]?.value.length > 1 ?
                        "w-full" :"w-full h-[980px]"}>
                        {dataResponse?.map((item: any, index: number)=>{
                            return(
                                <div key={index}>
                                    <div className="flex justify-between">
                                        <div className="flex gap-2">
                                            <ChevronDownIcon width={14} />
                                            <p className="font-bold text-[16px] leading-[20px] text-[#090A0A]">{item?.key}</p>
                                        </div>
                                        <p className="text-[#72777A] font-nomal text-[14px] leading-[16px]">{item?.method}</p>
                                    </div>
                                    {item?.data?.map((i:any,index0:number)=>{
                                        return(
                                            <div key={index0}>
                                                <div>
                                                    <div className="flex gap-2 ml-10 mt-3 ">
                                                        <p className="text-[#090A0A] font-normal text-[16px] leading-[20px]">{i?.type}</p>
                                                        <p className="text-[#979C9E] font-normal text-[16px] leading-[16px] mt-0.5"> {i?.typeOf}</p>
                                                    </div>
                                                    <div className="ml-10 mt-5 flex justify-between">
                                                        <p className="text-[#979C9E] font-normal text-[16px] leading-[20px]"> {i?.name}</p>
                                                    </div>
                                                </div>
                                                <div className="w-[622px] h-[1px] bg-[#F2F4F5] my-1 ml-10"></div>
                                            </div>
                                            
                                        )
                                    })}
                                    {item?.value?.map((item1:any, index1: number)=>{
                                        return (
                                            <div key={index1}>
                                                {item1?.map((item2:any, index2: number)=>{
                                                    if(item2.typeOf !== "object" || (item2.typeOf === "object" && item2.name === null)){
                                                        return (
                                                            <div key={index2}>
                                                                <div>
                                                                    <div className="flex gap-2 ml-10 mt-3 ">
                                                                        <p className="text-[#090A0A] font-normal text-[16px] leading-[20px]">{item2?.type}</p>
                                                                        <p className="text-[#979C9E] font-normal text-[16px] leading-[16px] mt-0.5"> {item2?.typeOf}</p>
                                                                    </div>
                                                                    <div className="ml-10 mt-5 flex justify-between">
                                                                        <p className="text-[#979C9E] font-normal text-[16px] leading-[20px]"> {item2?.name}</p>
                                                                        <p className="text-[#FF5247] text-[14px] leading-[16px] font-normal">{item2?.method}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="w-[622px] h-[1px] bg-[#F2F4F5] my-1 ml-10"></div>
                                                            </div>
                                                        )
                                                    }else{
                                                        return(<>
                                                            <div>
                                                                <div className="flex gap-2 ml-10 mt-3">
                                                                    <p className="text-[#090A0A] font-normal text-[16px] leading-[20px]">{item2?.type}</p>
                                                                    <p className="text-[#979C9E] font-normal text-[16px] leading-[16px] mt-0.5">{item2?.typeOf}</p>
                                                                </div>
                                                                {item2?.type === 'serviceTags'? <p className="text-[#979C9E] font-normal text-[16px] leading-[16px] ml-10 mt-3">{item2?.name[0]}</p> : "" }
                                                                {item2?.name?.map((item3: any, index3:number)=>{
                                                                    return(
                                                                        <>
                                                                            <div className="ml-[5.2rem] mt-3" key={index3}>
                                                                                <div className="flex gap-2">
                                                                                    <p className="text-[#090A0A] font-normal text-[16px] leading-[20px]">{item3?._type}</p>
                                                                                    <p className="text-[#979C9E] font-normal text-[16px] leading-[16px] mt-0.5">{item3?._typeOf}</p>
                                                                                </div>
                                                                                <p className="text-[#979C9E] font-normal text-[16px] leading-[16px] mt-3">{item3?._typeOf === 'boolean' ? (item3?._name).toString() : item3?._name}</p>
                                                                            </div>
                                                                            {item2?.name[index+1] ?<div className="w-[574px] h-[1px] bg-[#F2F4F5] ml-[5.2rem] mt-3"></div> : "" }
                                                                        </>
                                                                    )
                                                                })}
                                                                
                                                            </div>
                                                        
                                                        </>)
                                                    }
                                                })}
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                        
                    </div>
                    <div className= {isShowResponse ? "bg-[#F7F9FA] w-full rounded-[12px] p-[12px]" : "hidden"}>
                        <div className="flex justify-between">
                            <p className="text-[18px] leading-[24px] font-bold text[#090A0A] mt-1">Example Response</p>
                            <div onClick={() =>{copyToClipboard(dataExampleResponse)}} className="w-[52px] h-[40px] py-[8px] px-[13px] bg-[#fff] rounded-[4px] border border-[#CDCFD0] cursor-pointer">
                                <ClipboardDocumentCheckIcon className="h-[24px] w-[24px] text-[#E3E5E5]"/>
                            </div>
                        </div>
                        <div style={{ whiteSpace: "pre-wrap" }} className= {dataExampleResponse && dataExampleResponse !== ""
                            ? "w-full mt-2 "  
                            : "w-full mt-2"
                        }>
                            {JSON.stringify(dataExampleResponse, null, 4)}
                        </div>
                    </div>
                </div>
            </div>
    </div>
    
    </>)
}
