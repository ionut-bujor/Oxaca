package teamproject.backend.controller;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import teamproject.backend.dto.WaiterCallDTO;
import teamproject.backend.dto.WaiterCallRequestDTO;
import teamproject.backend.model.WaiterCall;
import teamproject.backend.service.WaiterCallService;

/**
 * REST endpoints for waiter calls.
 */
@RestController
@RequestMapping("/api/v1/waiter-calls")
public class WaiterCallController {

  private final WaiterCallService waiterCallService;

  /**
   * Creates a new controller.
   *
   * @param waiterCallService waiter call service
   */
  public WaiterCallController(WaiterCallService waiterCallService) {
    this.waiterCallService = waiterCallService;
  }

  /**
   * Customer creates a waiter call.
   *
   * @param request request body containing table number and optional note
   * @return created waiter call
   */
  @PostMapping
  public ResponseEntity<WaiterCallDTO> createWaiterCall(@RequestBody WaiterCallRequestDTO request) {
    WaiterCall created = waiterCallService.createCall(request.getTableNumber(), request.getNote());
    return ResponseEntity.ok(toDto(created));
  }

  /**
   * Staff lists waiter calls by status (defaults to OPEN).
   *
   * @param status waiter call status
   * @return list of matching calls
   */
  @GetMapping
  public ResponseEntity<List<WaiterCallDTO>> listWaiterCalls(
      @RequestParam(defaultValue = "OPEN") String status) {
    List<WaiterCallDTO> calls = waiterCallService.listByStatus(status).stream().map(this::toDto)
        .collect(Collectors.toList());
    return ResponseEntity.ok(calls);
  }

  /**
   * Staff resolves a waiter call.
   *
   * @param id waiter call id
   * @return updated waiter call
   */
  @PatchMapping("/{id}/resolve")
  public ResponseEntity<WaiterCallDTO> resolveWaiterCall(@PathVariable Long id) {
    WaiterCall updated = waiterCallService.resolveCall(id);
    return ResponseEntity.ok(toDto(updated));
  }

  private WaiterCallDTO toDto(WaiterCall call) {
    WaiterCallDTO dto = new WaiterCallDTO();
    dto.setId(call.getId());
    dto.setTableNumber(call.getTableNumber());
    dto.setNote(call.getNote());
    dto.setStatus(call.getStatus());
    dto.setCreatedAt(call.getCreatedAt());
    dto.setResolvedAt(call.getResolvedAt());
    return dto;
  }
}