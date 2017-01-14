package tiger.biz.transactioninfo.support.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import tiger.biz.device.support.DeviceManager;
import tiger.biz.transactioninfo.support.TransactionInfoManager;
import tiger.common.dal.persistence.icbc.SelectedSocialNet;
import tiger.core.basic.PageResult;
import tiger.core.domain.TransactionInfo.TransactionInfoDomain;
import tiger.core.domain.materials.MaterialsDomain;
import tiger.core.service.materials.MaterialsService;
import tiger.core.service.transactionInfo.TransactionInfoService;

import javax.transaction.TransactionManager;
import java.util.List;

/**
 * Created by Jian on 2017/1/10.
 * 调用service 提供的服务
 */
@Service
public class TransactionInfoManagerImpl implements TransactionInfoManager{
    @Autowired
    //MaterialsService materialsService;
    TransactionInfoService transactionInfoService;

    @Autowired
    DeviceManager deviceManager;


    @Override
    public TransactionInfoDomain selectByPrimaryKey(Integer id){
        TransactionInfoDomain transactionInfoDomain = transactionInfoService.selectByPrimaryKey(id);
        //暂时分开测试
        /**
        String dev = deviceManager.deviceInterface(transactionInfoDomain);
        int devInt;
        if(dev=="true"){
            devInt=1;
        }
        else{
            devInt=0;
        }
        transactionInfoDomain.setEquSign(devInt);
        */
        /**
         * 信任关系判定
        */
        SelectedSocialNet selectedSocialNet = new SelectedSocialNet();
        selectedSocialNet.setUser1(transactionInfoDomain.getTranOutCardNum());
        selectedSocialNet.setUser2(transactionInfoDomain.getTranInCardNum());
        //System.out.println(" Userq信息："+selectedSocialNet.getUser1()+" Userq信息："+selectedSocialNet.getUser2());

        //数据不对应
        /**
        selectedSocialNet.setTime(transactionInfoDomain.getEventDt().toString());
        selectedSocialNet.setMoney(transactionInfoDomain.getTxAmt().toString());
         */
        //写死在对象里面

        selectedSocialNet.setTime("12");
        selectedSocialNet.setMoney("12");
        //System.out.println("所有User信息"+selectedSocialNet);
        //发送http请求到远程服务器
        RestTemplate restTemplate = new RestTemplate();
        //ResponseEntity<SelectedSocialNet> entity = restTemplate.postForEntity("http://11.0.1.77:8080/api/socialnet/all", selectedSocialNet, SelectedSocialNet.class);
        ResponseEntity<String> entity = restTemplate.postForEntity("http://11.0.1.77:8080/api/socialnet/pass", selectedSocialNet, String.class);
        String TraStr = entity.getBody();
        //String TraStr = result.getPass();
        //System.out.println(result);
        System.out.println("返回值："+TraStr);
        int TraInt;
        if(TraStr=="1"){
            TraInt=1;
        }
        else{
            TraInt=0;
        }
        transactionInfoDomain.setTruSign(TraInt);


        return transactionInfoDomain;
    }

    @Override
    public List<TransactionInfoDomain> selectAll(){
        return transactionInfoService.selectAll();
    }
}
